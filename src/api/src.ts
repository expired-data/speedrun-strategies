import { useEffect, useState } from "react";

const apiBase = "https://www.speedrun.com/api/v1";

export interface Names {
  international: string;
  japanese: string | null;
  twitch?: string;
}

export interface BulkGame {
  abbreviation: string;
  id: string;
  names: Names;
  weblink: string;
  links: Array<Link<GameLinkType>>;
}

export enum GameLinkType {
  Self = "self",
  Runs = "runs",
  Levels = "levels",
  Categories = "categories",
  Variables = "variables",
  Records = "records",
  Series = "series",
  BaseGame = "base-game",
  DerivedGames = "derived-games",
  RomHacks = "romhacks",
  Leaderboard = "leaderboard",
}

enum PageLinkType {
  Next = "next",
  Previous = "prev",
}

interface Link<LinkType extends string> {
  rel: LinkType;
  uri: string;
}

interface Pagination {
  offset: number;
  max: number;
  size: number;
  links: Array<Link<PageLinkType>>;
}

interface GamesResponseData {
  data: Array<BulkGame>;
  pagination: Pagination;
}

export interface Category {
  id: string;
  name: string;
  weblink: string;
}

interface CategoriesResponseData {
  data: Array<Category>;
}

export interface Time {
  primary: string;
  primary_t: number;
}

export interface UserStub {
  id: string;
  rel: "user";
  uri: string;
}

export interface GuestStub {
  name: string;
  rel: "guest";
  uri: string;
}

export type PlayerStub = UserStub | GuestStub;

export interface Guest {
  name: string;
  rel: "guest";
  uri: string;
}

export interface User {
  id: string;
  names: Names;
  weblink: string;
}

export type Player = Guest | User;

export interface RunType {
  id: string;
  weblink: string;
  game: string;
  level: string | null;
  category: string;
  date: string;
  players: Array<PlayerStub>;
  videos: {
    links: Array<{ uri: string }>;
  };
  comment: string | null;
  times: Time;
}

export interface Run {
  place: number;
  run: RunType;
}

export interface Leaderboard {
  runs: Array<Run>;
  players: { data: Player[] };
}

export const getGames = async (search?: string): Promise<Array<BulkGame>> => {
  let url = `${apiBase}/games?`;

  if (search) {
    url += `&name=${search}`;
  }

  const response: GamesResponseData = await (await fetch(url)).json();

  return response.data;
};

export const getCategories = async (id: string): Promise<Array<Category>> => {
  const url = `${apiBase}/games/${id}/categories`;

  const response: CategoriesResponseData = await (await fetch(url)).json();

  return response.data;
};

export const getLeaderboards = async (
  categoryId: string,
  gameId: string
): Promise<Leaderboard> => {
  const url = `${apiBase}/leaderboards/${gameId}/category/${categoryId}?embed=players`;

  const response: { data: Leaderboard } = await (await fetch(url)).json();

  return response.data;
};

/*eslint-disable-next-line @typescript-eslint/no-explicit-any*/
export const useGetData = <T, Args extends any[]>(
  getDataFn: (...args: Args) => Promise<T>,
  ...args: Args
): T | undefined => {
  const [data, setData] = useState<T | undefined>();

  useEffect(() => {
    setData(undefined);
    getDataFn(...args).then(setData);
  }, [...args]);

  return data;
};
