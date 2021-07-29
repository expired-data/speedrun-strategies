import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import type { Player, RunType } from "./src";

export interface Strat {
  id: string;
  run: string;
  timestamp: number;
  name: string;
  comment: string;
}

export type PlayerRunType = Omit<RunType, "players"> & {
  players: Player[];
  place: number;
  strats: Strat[];
};

export interface StratAPI {
  strats: Strat[];
  addStrat: (strat: Strat) => void;
  deleteStrat: (strat: Strat) => void;
}

const getStrats = (run: string) => gql`
  query getStrats {
    strats(where: { run: { _eq: "${run}" } }) {
      comment
      id
      name
      run
      timestamp
    }
  }
`;

const addStratMutation = gql`
  mutation addStrat(
    $comment: String = ""
    $name: String = ""
    $run: String = ""
    $timestamp: Int = 0
  ) {
    insert_strats(
      objects: {
        comment: $comment
        name: $name
        run: $run
        timestamp: $timestamp
      }
    ) {
      returning {
        id
      }
    }
  }
`;

const deleteStratMutation = gql`
  mutation deleteStrat($id: uuid = "") {
    delete_strats(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

export const useGetStrats = (runId: string): StratAPI => {
  const [strats, setStrats] = useState<Strat[]>([]);
  const stratsQuery = useMemo(() => getStrats(runId), [runId]);
  const { data } = useQuery(stratsQuery);
  useEffect(() => {
    if (data?.strats) {
      setStrats(data.strats);
    }
  }, [data]);
  const [addStratMut] = useMutation(addStratMutation);
  const [deleteStratMut] = useMutation(deleteStratMutation);
  const addStrat = (strat: Strat) => {
    addStratMut({
      variables: {
        comment: strat.comment,
        name: strat.name,
        run: strat.run,
        timestamp: strat.timestamp,
      },
    }).then(({ data }) => {
      if (data.insert_strats?.returning[0]?.id) {
        setStrats((strats) => [
          ...strats,
          { ...strat, id: data.insert_strats?.returning[0]?.id },
        ]);
      }
    });
  };

  const deleteStrat = (strat: Strat) => {
    deleteStratMut({
      variables: {
        id: strat.id,
      },
    });
    setStrats((strats) => strats.filter((s) => s.id !== strat.id));
  };

  return {
    strats: strats,
    addStrat,
    deleteStrat,
  };
};
