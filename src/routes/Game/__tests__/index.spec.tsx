import React, { ChangeEvent } from "react";
import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";

import { getCategories, Category } from "api";
import { SKATE_3_ID } from "testHelpers/testIds";
import { Props as RunBoardProps } from "../RunBoard";
import { Game } from "..";

const MOCK_CATEGORIES: Array<Category> = [
  {
    id: "1afhjfgierhj",
    name: "any%",
    weblink: "link",
  },
  {
    id: "2afhjfgierhj",
    name: "100%",
    weblink: "link2",
  },
];

jest.mock("../RunBoard", () => ({
  __esModule: true,
  RunBoard: jest.fn(({ categoryId, onlyWithStrats = true }: RunBoardProps) => {
    return (
      <>
        <div>RUNBOARD:{categoryId}</div>
        <div>{onlyWithStrats ? "strats only" : "strats not required"}</div>
      </>
    );
  }),
}));

jest.mock("api", () => ({
  __esModule: true,
  getCategories: jest.fn(
    (): Promise<Array<Category>> => {
      return Promise.resolve(MOCK_CATEGORIES);
    }
  ),
  useGetData: jest.requireActual("api").useGetData,
}));

test("Game renders with categories from src", async () => {
  const { findByText, container } = render(
    <MemoryRouter initialEntries={[`/game/${SKATE_3_ID}`]} initialIndex={0}>
      <Route component={Game} path="/game/:id" />
    </MemoryRouter>
  );
  await findByText(`RUNBOARD:${MOCK_CATEGORIES[0].id}`);
  expect(getCategories).toHaveBeenCalled();
  expect(container.innerHTML).toMatchSnapshot();
});

test("Changing category updates runboard", async () => {
  const { findByText, container } = render(
    <MemoryRouter initialEntries={[`/game/${SKATE_3_ID}`]} initialIndex={0}>
      <Route component={Game} path="/game/:id" />
    </MemoryRouter>
  );
  await findByText(`RUNBOARD:${MOCK_CATEGORIES[0].id}`);
  expect(getCategories).toHaveBeenCalled();
  const select = container.querySelector("select");
  if (select)
    fireEvent.change(select, {
      target: {
        value: MOCK_CATEGORIES[1].id,
      },
    } as ChangeEvent<HTMLSelectElement>);

  await findByText(`RUNBOARD:${MOCK_CATEGORIES[1].id}`);
  expect(container.innerHTML).toMatchSnapshot();
});

test("Changing checkbox updates state", async () => {
  const { findByText, container } = render(
    <MemoryRouter initialEntries={[`/game/${SKATE_3_ID}`]} initialIndex={0}>
      <Route component={Game} path="/game/:id" />
    </MemoryRouter>
  );
  await findByText(`RUNBOARD:${MOCK_CATEGORIES[0].id}`);
  expect(getCategories).toHaveBeenCalled();
  const checkbox = container.querySelector("input");
  if (checkbox) fireEvent.click(checkbox);
  await findByText("strats not required");
  expect(container.innerHTML).toMatchSnapshot();
});
