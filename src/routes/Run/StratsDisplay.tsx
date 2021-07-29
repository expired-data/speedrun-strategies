import { Strat } from "api";
import React, {
  FC,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { StratDisplay } from "./StratDisplay";

interface Props {
  time: number;
  setTime: (newTime: number) => void;
  strats: Strat[];
  deleteStrat: (strat: Strat) => void;
}

const StratsContainer = styled.div`
  height: 500px;
  overflow: scroll;
  width: 100%;
  position: relative;
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const StratsDisplay: FC<Props> = ({
  time,
  setTime,
  strats,
  deleteStrat,
}) => {
  const [scrolledStrat, setScrolledStrat] = useState<Strat>(
    [...strats.sort((a, b) => a.timestamp - b.timestamp)][0]
  );
  const containerRef = useRef() as MutableRefObject<HTMLDivElement>;
  useEffect(() => {
    const mostRecent = [...strats.sort((a, b) => a.timestamp - b.timestamp)]
      .filter((strat) => strat.timestamp <= time)
      .pop();
    if (mostRecent && mostRecent !== scrolledStrat) {
      setScrolledStrat(mostRecent);
      const scrollAmount = document.getElementById(`strat-${mostRecent.id}`)
        ?.offsetTop;
      containerRef.current.scrollTop = scrollAmount || 0;
    }
  }, [time]);
  return (
    <StratsContainer ref={containerRef}>
      {strats.map((strat) => (
        <StratDisplay
          strat={strat}
          jumpToStrat={() => setTime(strat.timestamp)}
          active={strat === scrolledStrat}
          deleteStrat={deleteStrat}
        />
      ))}
    </StratsContainer>
  );
};
