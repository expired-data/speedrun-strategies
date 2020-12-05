import { getGames } from "./src";
import fetch from "node-fetch";

if (!globalThis.fetch) {
  globalThis.fetch = (fetch as unknown) as (
    input: RequestInfo,
    init?: RequestInit | undefined
  ) => Promise<Response>;
}

expect.extend({
  stringOrNull(received: any) {
    return received === null || typeof received === "string"
      ? {
          message: () => `expected ${received} to be string or null`,
          pass: true,
        }
      : {
          message: () => `expected ${received} to be string or null`,
          pass: false,
        };
  },
});

test("calling get games gives a set of game objects", async () => {
  const games = await getGames();
  games.forEach((game) =>
    expect(game).toEqual(
      expect.objectContaining({
        abbreviation: expect.any(String),
        id: expect.any(String),
        names: expect.objectContaining({
          international: expect.any(String),
          japanese: ((expect as unknown) as {
            stringOrNull: () => {};
          }).stringOrNull(),
        }),
        weblink: expect.any(String),
      })
    )
  );
});

test("calling get games with a search term gives set of game objects filtered by the term", async () => {
  const games = await getGames("skate");

  expect(
    games
      .map((game) => game.names.international)
      .filter((name) => !name.toLowerCase().includes("skate"))
  ).toHaveLength(0);
});
