import React from "react";
import { render } from "@testing-library/react";
import { Table } from "./";
import { Column } from "react-table";

test("Table renders without data", () => {
  expect(
    render(<Table data={[]} columns={[]} />).container.innerHTML
  ).toMatchSnapshot();
});

test("Table renders with sample data", () => {
  const data = [
    {
      name: "foo",
      age: 12,
    },
  ];

  const columns: Column<{ name: string; age: number }>[] = [
    { accessor: "name", Header: "Name" },
    { accessor: "age", Header: "Age" },
  ];

  expect(
    render(<Table data={data} columns={columns} />).container.innerHTML
  ).toMatchSnapshot();
});
