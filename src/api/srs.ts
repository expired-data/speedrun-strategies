import { useState } from "react";
import type { Player, RunType } from "./src";

export interface Strat {
  id: string;
  run: string;
  timestamp: number;
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
}

export const useGetStrats = (): StratAPI => {
  const [strats, setStrats] = useState<Strat[]>([]); //in memory temporarily - move to use external db

  return {
    strats,
    addStrat: (strat: Strat) => setStrats((s) => [...s, strat]),
  };
};
