import React from "react";
import { render, fireEvent } from "@testing-library/react";
import type { BulkGame } from "api";
import { GameCard } from "./GameCard";

const MOCK_GAME: BulkGame = {
  abbreviation: "",
  id: "abcdefg",
  names: {
    international: "test game",
    japanese: null,
  },
  weblink: "",
  links: [],
};

const mockPush = jest.fn();

jest.mock("react-router-dom", () => ({
  useHistory: () => ({ push: mockPush }),
}));

test("GameCard renders as expected", () => {
  const { container } = render(<GameCard game={MOCK_GAME} />);
  expect(container.innerHTML).toMatchSnapshot();
});

test("GameCard pushes to history when called", () => {
  const { container } = render(<GameCard game={MOCK_GAME} />);
  const card = container.querySelector("div");
  if (card) fireEvent.click(card);

  expect(mockPush).toHaveBeenCalledWith(`/game/${MOCK_GAME.id}`);
});
