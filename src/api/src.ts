const apiBase = "https://www.speedrun.com/api/v1";

export interface Names {
  international: string;
  japanese: string | null;
}

export interface BulkGame {
  abbreviation: string;
  id: string;
  names: Names;
  weblink: string;
}

enum LinkType {
  Next = "next",
  Previous = "prev",
}

interface Link {
  rel: LinkType;
  uri: string;
}

interface Pagination {
  offset: number;
  max: number;
  size: number;
  links: Array<Link>;
}

interface ResponseData {
  data: Array<BulkGame>;
  pagination: Pagination;
}

export const getGames = async (search?: string): Promise<Array<BulkGame>> => {
  let url = `${apiBase}/games?_bulk=yes`;

  if (search) {
    url += `&name=${search}`;
  }

  const response: ResponseData = await (await fetch(url)).json();

  return response.data;
};
