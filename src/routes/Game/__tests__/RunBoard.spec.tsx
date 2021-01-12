import React from "react";
import { render } from "@testing-library/react";

import { getLeaderboards, Leaderboard } from "api";
import { SKATE_3_ID, ANY_PERCENT_ID } from "testHelpers/testIds";
import { MOCK_LEADERBOARD, ERROR_LEADERBOARD } from "./mockData";

import { RunBoard } from "../RunBoard";

console.error = jest.fn();

jest.mock("api", () => ({
  __esModule: true,
  getLeaderboards: jest.fn(
    (categoryId, gameId): Promise<Leaderboard> => {
      return gameId === SKATE_3_ID
        ? Promise.resolve(MOCK_LEADERBOARD)
        : Promise.resolve(ERROR_LEADERBOARD);
    }
  ),
  useGetData: jest.requireActual("api").useGetData,
}));

test("Run board renders with leaderboard from SRC", async () => {
  const { findByRole } = render(
    <RunBoard categoryId={ANY_PERCENT_ID} gameId={SKATE_3_ID} />
  );
  const leaderboard = await findByRole("table");
  expect(getLeaderboards).toHaveBeenCalled();
  expect(leaderboard.innerHTML).toMatchSnapshot();
});

test("Run board renders with non strat runs", async () => {
  const { findByRole } = render(
    <RunBoard
      categoryId={ANY_PERCENT_ID}
      gameId={SKATE_3_ID}
      onlyWithStrats={false}
    />
  );
  const leaderboard = await findByRole("table");
  expect(getLeaderboards).toHaveBeenCalled();
  expect(leaderboard.innerHTML).toMatchSnapshot();
});

test("Run board errors if cant find player SRC", async () => {
  expect(async () => {
    const { findByRole } = render(
      <RunBoard categoryId={ANY_PERCENT_ID} gameId={""} />
    );
    await findByRole("table");
    expect(console.error).toHaveBeenCalledTimes(1);
  }).rejects.toThrowError();
});
