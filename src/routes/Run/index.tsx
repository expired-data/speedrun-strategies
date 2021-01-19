import React, { FC, RefObject, useMemo, useRef, useState } from "react";
import type { RouteComponentProps } from "react-router-dom";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { useGetData, getRun, useGetStrats, Strat } from "api";
import { getScrollbarWidth } from "utils/useWindowSize";
import { secondsToNice } from "utils/time";
import { StratEntry } from "./stratEntry";

const FlexDiv = styled.div`
  display: flex;
`;

const SpacedFlexDiv = styled(FlexDiv)`
  justify-content: space-between;
`;

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
  const [editMode, setEditMode] = useState<boolean>(false);
  const { strats, addStrat } = useGetStrats();
  const ref = useRef<ReactPlayer>() as RefObject<ReactPlayer>;
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
    <>
      <FlexDiv>
        <ReactPlayer
          url={run.videos.links[0]?.uri}
          controls
          width={editMode ? "50%" : `100%`}
          height={`calc((80vw - 116px - ${scrollBarWidth}px)*${9 / 16}${
            editMode ? "/2" : ""
          })`}
          ref={ref}
          progressInternal={100}
          onProgress={({ playedSeconds }) => updateStrats(playedSeconds)}
          onPlay={() => updateStrats(ref.current!.getCurrentTime())}
        />
        {editMode && (
          <StratEntry
            id={id}
            addStrat={addStrat}
            getCurrentTime={() => ref.current!.getCurrentTime()}
          />
        )}
      </FlexDiv>
      <SpacedFlexDiv>
        <div>
          {shownStrats?.map((strat) => (
            <div>
              {secondsToNice(strat.timestamp)} - {strat.comment}
            </div>
          ))}
        </div>
        <div>
          <button
            onClick={() => {
              setEditMode(!editMode);
            }}
          >
            {editMode ? "Leave" : "Enter"} strat mode
          </button>
        </div>
      </SpacedFlexDiv>
    </>
  );
};
