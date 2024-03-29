import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Search } from "./";

test("search component renders as expected", () => {
  const onSearch = jest.fn();
  const { container } = render(<Search onSearch={onSearch} />);
  expect(container.innerHTML).toMatchSnapshot();
});

test("search component calls on search when button pressed", () => {
  const onSearch = jest.fn();
  const { container } = render(<Search onSearch={onSearch} />);
  (container.querySelector("input") as HTMLInputElement).value = "search";
  fireEvent.click(container.querySelector("button") as HTMLButtonElement);
  expect(onSearch).toHaveBeenCalledWith("search");
});

test("search component calls on search when enter key is pressed", () => {
  const onSearch = jest.fn();
  const { container } = render(<Search onSearch={onSearch} />);
  (container.querySelector("input") as HTMLInputElement).value = "search";
  fireEvent.focus(container.querySelector("input") as HTMLInputElement);
  fireEvent.keyDown(container.querySelector("input") as HTMLInputElement, {
    key: "Enter",
    code: "Enter",
  });
  expect(onSearch).toHaveBeenCalledWith("search");
});

test("search component does nothing on search when non-enter key is pressed", () => {
  const onSearch = jest.fn();
  const { container } = render(<Search onSearch={onSearch} />);
  (container.querySelector("input") as HTMLInputElement).value = "search";
  fireEvent.focus(container.querySelector("input") as HTMLInputElement);
  fireEvent.keyDown(container.querySelector("input") as HTMLInputElement, {
    key: "1",
    code: "Digit1",
  });
  expect(onSearch).toHaveBeenCalledTimes(0);
});
