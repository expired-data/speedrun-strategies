import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { BulkGame } from "api";

export interface Props {
  game: BulkGame;
}

const Card = styled.div`
  border: 1px solid #cdcdcd;
  margin: 20px;
  width: 400px;
  height: 5em;
  padding: 5px;
  float: left;
  font-size: large;

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;

  &:hover {
    box-shadow: 0 16px 32px 0 rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
`;

export const GameCard: FC<Props> = ({ game }) => {
  const history = useHistory();

  return (
    <Card onClick={() => history.push(`/game/${game.id}`)}>
      <span>{game.names.international}</span>
      <br />
    </Card>
  );
};
