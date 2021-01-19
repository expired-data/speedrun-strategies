import React, { FC, RefObject, useMemo, useRef, useState } from "react";
import type { RouteComponentProps } from "react-router-dom";
import ReactPlayer from "react-player";
import { useGetData, getRun, useGetStrats, Strat } from "api";
import { getScrollbarWidth } from "utils/useWindowSize";
import { secondsToNice } from "utils/time";

export interface Props {
  id: string;
}

const arrEq = (arr1: unknown[], arr2: unknown[]) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  return arr1.every((e, i) => e === arr2[i]);
};

export const Run: FC<RouteComponentProps<Props>> = ({
  match: {
    params: { id },
  },
}) => {
  const run = useGetData(getRun, id);
  const scrollBarWidth = useMemo(getScrollbarWidth, []);
  const [shownStrats, setShownStrats] = useState<Strat[]>();
  const { strats, addStrat } = useGetStrats();
  const ref = useRef<ReactPlayer>() as RefObject<ReactPlayer>;
  const input = useRef() as RefObject<HTMLInputElement>;
  if (!run) {
    return <>Loading...</>;
  }

  const updateStrats = (seconds: number): void => {
    const relevant = strats.filter(
      (strat) => Math.abs(seconds - strat.timestamp) < 60
    );

    if (
      !shownStrats ||
      !arrEq(
        relevant.map((x) => x.id),
        shownStrats.map((x) => x.id)
      )
    ) {
      setShownStrats(relevant);
    }
  };

  return (
    <div>
      <ReactPlayer
        url={run.videos.links[0]?.uri}
        controls
        width={`100%`}
        height={`calc((80vw - 116px - ${scrollBarWidth}px)*${9 / 16})`}
        ref={ref}
        progressInternal={100}
        onProgress={({ playedSeconds }) => updateStrats(playedSeconds)}
        onPlay={() => updateStrats(ref.current!.getCurrentTime())}
      />
      <button
        onClick={() => {
          addStrat({
            run: id,
            timestamp: ref.current!.getCurrentTime(),
            comment: input.current!.value,
            id: Math.random().toString(),
          });
        }}
      >
        Add strat here
      </button>
      <input ref={input} placeholder={"strat comment"} />
      {shownStrats?.map((strat) => (
        <div>
          {secondsToNice(strat.timestamp)} - {strat.comment}
        </div>
      ))}
    </div>
  );
};
