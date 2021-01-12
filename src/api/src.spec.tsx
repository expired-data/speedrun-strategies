/*eslint-disable @typescript-eslint/no-explicit-any*/
import React from "react";
import {
  BulkGame,
  getCategories,
  getGames,
  getLeaderboards,
  useGetData,
} from "./src";
import fetch from "node-fetch";
import { render, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { SKATE_1_ID, SKATE_3_ID, ANY_PERCENT_ID } from "testHelpers/testIds";

if (!globalThis.fetch) {
  globalThis.fetch = (fetch as unknown) as (
    input: RequestInfo,
    init?: RequestInit | undefined
  ) => Promise<Response>;
}

expect.extend({
  stringOrNull(received: unknown) {
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
            stringOrNull: () => Record<string, unknown>;
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

test("calling get categories gives a set of category objects", async () => {
  const categories = await getCategories(SKATE_3_ID);

  expect(categories.length).toBeTruthy();
});

test("calling get leaderboards returns a leaderboard", async () => {
  const leaderboard = await getLeaderboards(ANY_PERCENT_ID, SKATE_3_ID);

  expect(leaderboard).toBeDefined();
});

const capturingObject: { lastResult: Promise<unknown> | null } = {
  lastResult: null,
};
const mockedUseGetData = ((capturingObject: { lastResult: unknown }) => (
  getDataFn: (...args: any[]) => Promise<unknown>,
  ...args: any[]
) => {
  capturingObject.lastResult = null;
  const resultantPromise = useGetData(getDataFn, ...args);
  capturingObject.lastResult = resultantPromise;
  return resultantPromise;
})(capturingObject);

const ComponentGettingData = ({ gameId }: { gameId: string }) => {
  const skateGames = mockedUseGetData(getGames, "skate") as
    | BulkGame[]
    | undefined;

  if (!skateGames) {
    return <>...</>;
  }

  return <>{skateGames.find((x) => x.id === gameId)?.names.international}</>;
};

test("component with use hook can get data", async () => {
  await act(async () => {
    const { container, rerender } = render(
      <ComponentGettingData gameId={SKATE_3_ID} />
    );

    await waitFor(() => expect(capturingObject.lastResult).toBeTruthy());
    await capturingObject.lastResult;

    expect(container.innerHTML).toMatchSnapshot();

    rerender(<ComponentGettingData gameId={SKATE_1_ID} />);

    await waitFor(() => expect(capturingObject.lastResult).toBeTruthy());
    await capturingObject.lastResult;

    expect(container.innerHTML).toMatchSnapshot();
  });
});
