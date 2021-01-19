import React, { FC, useMemo } from "react";
import { useHistory } from "react-router-dom";

import {
  PlayerRunType,
  useGetData,
  GuestStub,
  UserStub,
  Guest,
  User,
  getLeaderboards,
  Player,
} from "api";
import { splitTime } from "utils/time";
import { Column } from "react-table";
import { Table } from "components/Table";

export interface Props {
  categoryId: string;
  gameId: string;
  onlyWithStrats?: boolean;
}

export const RunBoard: FC<Props> = ({ categoryId, gameId, onlyWithStrats }) => {
  const history = useHistory();
  const leaderboard = useGetData(getLeaderboards, categoryId, gameId);

  const runsWithPlayerNames: PlayerRunType[] = useMemo(
    () =>
      leaderboard?.runs
        .map((run) => ({
          ...run.run,
          players: run.run.players.map((player) => {
            let resultantPlayer: Player | undefined;
            if ((player as UserStub).id) {
              resultantPlayer = leaderboard.players.data.find(
                (fullPlayer) =>
                  (fullPlayer as User).id === (player as UserStub).id
              );
            } else {
              resultantPlayer = leaderboard.players.data.find(
                (fullPlayer) =>
                  (fullPlayer as Guest).name === (player as GuestStub).name
              );
            }

            if (!resultantPlayer) {
              throw new Error("Unable to find player name");
            }

            return resultantPlayer;
          }),
          place: run.place,
          strats: [],
        }))
        .filter((run) => !onlyWithStrats || run.strats.length > 0) || [],
    [leaderboard, onlyWithStrats]
  );

  const columns: Column<PlayerRunType>[] = useMemo(
    () => [
      {
        accessor: "place",
        Header: "Position",
      },
      {
        accessor: "times",
        Cell: ({ value: { primary: runTime } }) => <>{splitTime(runTime)}</>,
        Header: "Time",
      },
      {
        accessor: "players",
        Cell: ({ value: players }) => (
          <>
            {players
              .map(
                (player) =>
                  (player as Guest).name || (player as User).names.international
              )
              .join(", ")}
          </>
        ),
        Header: "Player",
      },
      {
        accessor: "strats",
        Cell: ({ value: strats }) => <>{strats.length}</>,
        Header: "Number of strats",
      },
    ],
    []
  );

  if (!leaderboard) {
    return <div>Loading...</div>;
  }

  return (
    <Table<PlayerRunType>
      data={runsWithPlayerNames}
      columns={columns}
      rowClick={(row) => {
        history.push(`/run/${row.original.id}`);
      }}
    />
  );
};
