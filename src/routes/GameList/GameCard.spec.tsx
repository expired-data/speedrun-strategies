import React from "react";
import { render } from "@testing-library/react";
import type { BulkGame } from "api/src";
import { GameCard } from "./GameCard";

const MOCK_GAME: BulkGame = {
  abbreviation: "",
  id: "abcdefg",
  names: {
    international: "test game",
    japanese: null,
  },
  weblink: "",
};

test("GameCard renders as expected", () => {
  const { container } = render(<GameCard game={MOCK_GAME} />);
  expect(container.innerHTML).toMatchSnapshot();
});
