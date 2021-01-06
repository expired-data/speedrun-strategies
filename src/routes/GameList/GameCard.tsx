import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";

import { BulkGame, getCategories, getLeaderboards, Leaderboard } from "api/src";
import { splitTime } from "utils/time";

export interface Props {
  game: BulkGame;
}

const Card = styled.div`
  border: 1px solid #cdcdcd;
  margin: 20px;
  width: 200px;
  height: 5em;
  padding: 5px;
  float: left;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  &:hover {
    box-shadow: 0 16px 32px 0 rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
`;

export const GameCard: FC<Props> = ({ game }) => {
  const [id, setId] = useState<Leaderboard | null>(null);
  const [category, setCategory] = useState<string>("");
  useEffect(() => {
    getCategories(game.id).then((value) => {
      setCategory(value[0].name);
      getLeaderboards(value[0].id, game.id).then((leaderboard) => {
        setId(leaderboard);
      });
    });
  }, []);

  const runTime = id ? id.runs[0]?.run.times.primary : "";

  return (
    <Card>
      <span>{game.names.international}</span>
      <br />
      <span>Main Category: {category}</span>
      <br />
      <span>WR Time: {runTime ? splitTime(runTime) : "No recorded runs"}</span>
    </Card>
  );
};
