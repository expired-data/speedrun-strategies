import React, { FC, RefObject, useRef } from "react";
import styled from "styled-components";
import { Strat } from "api";

const StyledDiv = styled.div`
  padding-left: 0.5rem;
`;
const StyledInput = styled.input`
  margin-left: 0.5rem;
`;
export interface Props {
  id: string;
  addStrat: (strat: Strat) => void;
  getCurrentTime: () => number;
}

export const StratEntry: FC<Props> = ({ id, addStrat, getCurrentTime }) => {
  const input = useRef() as RefObject<HTMLInputElement>;
  return (
    <StyledDiv>
      <button
        onClick={() => {
          addStrat({
            run: id,
            timestamp: getCurrentTime(),
            comment: input.current!.value,
            id: Math.random().toString(),
          });
        }}
      >
        Add strat here
      </button>
      <StyledInput ref={input} placeholder={"strat comment"} />
    </StyledDiv>
  );
};
