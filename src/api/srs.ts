import type { Player, RunType } from "./src";

export interface Strat {
  run: string;
  timestamp: string;
  comment: string;
}

export type PlayerRunType = Omit<RunType, "players"> & {
  players: Player[];
  place: number;
  strats: Strat[];
};
