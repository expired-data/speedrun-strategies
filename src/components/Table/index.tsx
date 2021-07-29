import React from "react";
import { Column, Row, useTable } from "react-table";
import styled from "styled-components";

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-top: min(20px, 5vh);
`;

const StyledTr = styled.tr<{ index: number; selectable?: boolean }>`
  background-color: ${({ index }) => (index % 2 ? "#f2f2f2" : "white")};
  border: 1px solid white;
  ${({ selectable }) =>
    selectable
      ? `&:hover, :focus-within { 
        cursor: pointer;
        outline: none;
        border-color: #9ecaed;
        box-shadow: 0 0 10px #9ecaed;
        z-index: 10;
    }`
      : ""}
`;

const StyledTd = styled.td`
  text-align: center;
`;

export interface Props<D extends Record<string, unknown>> {
  data: D[];
  columns: Column<D>[];
  className?: string;
  rowClick?: (row: Row<D>) => void;
}

export const Table = <D extends Record<string, unknown>>({
  data,
  columns,
  className,
  rowClick,
}: Props<D>): JSX.Element => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable<D>({ data, columns });

  return (
    <StyledTable className={className} {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <StyledTr index={1} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </StyledTr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <StyledTr
              selectable={true}
              index={i}
              onClick={((row) => () => {
                rowClick && rowClick(row);
              })(row)}
              {...row.getRowProps()}
            >
              {row.cells.map((cell) => {
                return (
                  <StyledTd {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </StyledTd>
                );
              })}
            </StyledTr>
          );
        })}
      </tbody>
    </StyledTable>
  );
};
