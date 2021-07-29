import React, { FC, RefObject, useRef, useState } from "react";
import type { RouteComponentProps } from "react-router-dom";
import ReactPlayer from "react-player";
import { useGetData, getRun, useGetStrats } from "api";
import styled from "styled-components";
import { StratsDisplay } from "./StratsDisplay";
import { AddStratForm } from "./AddStratForm";

export interface Props {
  id: string;
}

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledReactPlayer = styled(ReactPlayer)`
  flex: none;
`;

export const Run: FC<RouteComponentProps<Props>> = ({
  match: {
    params: { id },
  },
}) => {
  const run = useGetData(getRun, id);
  const { strats, addStrat, deleteStrat } = useGetStrats(run?.id || "");
  const [time, setTime] = useState<number>(0);
  const ref = useRef<ReactPlayer>() as RefObject<ReactPlayer>;
  if (!run) {
    return <>Loading...</>;
  }

  const updateTime = (time: number) => {
    ref.current!.seekTo(time);
  };

  return (
    <div>
      <FlexDiv>
        <StyledReactPlayer
          url={run.videos.links[0]?.uri}
          controls
          width={`min(900px, 75%)`}
          height={500}
          ref={ref}
          progressInternal={100}
          onProgress={({ playedSeconds }: { playedSeconds: number }) =>
            setTime(playedSeconds)
          }
          onPlay={() => setTime(ref.current!.getCurrentTime())}
        />
        <StratsDisplay
          strats={strats}
          time={time}
          setTime={updateTime}
          deleteStrat={deleteStrat}
        />
      </FlexDiv>
      <AddStratForm time={time} run={run.id} addStrat={addStrat} />
    </div>
  );
};
