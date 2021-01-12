import React, { FC, useEffect, useState } from "react";
import type { RouteComponentProps } from "react-router-dom";

import { getCategories, useGetData } from "api";
import { RunBoard } from "./RunBoard";
import styled from "styled-components";

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export interface Props {
  id: string;
}
export const Game: FC<RouteComponentProps<Props>> = ({
  match: {
    params: { id },
  },
}) => {
  const categories = useGetData(getCategories, id);
  const [categoryId, setCategoryId] = useState<string>("");
  const [onlyWithStrats, setOnlyWithStrats] = useState<boolean>(true);

  useEffect(() => {
    if (categories) {
      setCategoryId(categories[0].id);
    }
  }, [categories]);

  if (!categories) {
    return <>Loading...</>;
  }

  return (
    <>
      <FlexRow>
        <div>
          Category:{" "}
          <select onChange={(e) => setCategoryId(e.currentTarget.value)}>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          Only show runs with strats{" "}
          <input
            type="checkbox"
            defaultChecked={true}
            onChange={(e) => setOnlyWithStrats(e.target.checked)}
          />
        </div>
      </FlexRow>

      {categoryId && (
        <RunBoard
          onlyWithStrats={onlyWithStrats}
          categoryId={categoryId}
          gameId={id}
        />
      )}
    </>
  );
};
