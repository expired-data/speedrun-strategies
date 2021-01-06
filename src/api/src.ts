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

interface Time {
  primary: string;
  primary_t: number;
}

interface RunType {
  id: string;
  weblink: string;
  game: string;
  level: string | null;
  cateory: string;
  videos: {
    links: Array<{ uri: string }>;
  };
  comment: string;
  times: Time;
}

export interface Run {
  place: number;
  run: RunType;
}

export interface Leaderboard {
  runs: Array<Run>;
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
  let url = `${apiBase}/games/${id}/categories`;

  const response: CategoriesResponseData = await (await fetch(url)).json();

  return response.data;
};

export const getLeaderboards = async (
  categoryId: string,
  gameId: string
): Promise<Leaderboard> => {
  let url = `${apiBase}/leaderboards/${gameId}/category/${categoryId}`;

  const response: { data: Leaderboard } = await (await fetch(url)).json();

  return response.data;
};
