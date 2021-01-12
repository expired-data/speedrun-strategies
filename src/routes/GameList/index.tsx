import React, { useState, FC } from "react";
import styled from "styled-components";
import { getGames, useGetData } from "api";
import { GameCard } from "./GameCard";
import { Search } from "components/Search";
import { useWindowSize } from "utils/useWindowSize";

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FlexRow = styled.div`
  display: flex;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const GamesList: FC = () => {
  const [search, setSearch] = useState<string>("");
  const games = useGetData(getGames, search);
  const windowSize = useWindowSize();
  const cardsPerRow = Math.floor((windowSize.width || 700) / 500);

  if (!games) {
    return <>Loading...</>;
  }

  return (
    <div>
      <TitleRow>
        <h1>Games {search && `(${search})`}</h1>
        <SearchContainer data-testid="search">
          <Search onSearch={setSearch} />
        </SearchContainer>
      </TitleRow>
      {games
        .map((game) => <GameCard game={game} key={game.id} />)
        .reduce((acc, cur, idx) => {
          if (!(idx % cardsPerRow)) {
            acc[Math.floor(idx / cardsPerRow)] = new Array<JSX.Element>();
          }
          acc[Math.floor(idx / cardsPerRow)].push(cur);
          return acc;
        }, [] as JSX.Element[][])
        .map((arr, idx) => (
          <FlexRow key={idx}>{arr}</FlexRow>
        ))}
    </div>
  );
};
