import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Strat } from "api";
import React, { FC } from "react";
import styled from "styled-components";
import { secondsToNice } from "utils/time";

const FlexDiv = styled.div`
  display: flex;
`;

const FlexEndButton = styled.button`
  display: block;
  margin-left: auto;
`;

const Button = styled.button`
  all: unset;
  text-decoration: underline;
  color: #0000aa;
  &:hover {
    cursor: pointer;
    color: #0000ff;
  }
`;

const Name = styled.span`
  font-size: 16px;
`;

const StratContainer = styled.div<{ active: boolean }>`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  padding: 4px 16px;
  margin: 5px 10px 5px 5px;
  ${(props) =>
    props.active &&
    `
    box-shadow: 0 0 5px rgba(81, 203, 238, 1);
    border: 1px solid rgba(81, 203, 238, 1);
    `}
`;

interface Props {
  strat: Strat;
  jumpToStrat: () => void;
  deleteStrat: (strat: Strat) => void;
  active: boolean;
}

export const StratDisplay: FC<Props> = ({
  strat,
  jumpToStrat,
  active,
  deleteStrat,
}) => {
  return (
    <StratContainer id={`strat-${strat.id}`} active={active}>
      <FlexDiv>
        <div>
          <Button onClick={jumpToStrat}>
            {secondsToNice(strat.timestamp)}
          </Button>{" "}
          - <Name>{strat.name}</Name>
        </div>
        <FlexEndButton onClick={() => deleteStrat(strat)}>
          <FontAwesomeIcon icon={faTrash} />
        </FlexEndButton>
      </FlexDiv>
      <p>{strat.comment}</p>
    </StratContainer>
  );
};
