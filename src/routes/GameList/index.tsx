import React, { useState, useEffect, FC, FormEvent } from "react";
import styled from "styled-components";
import { getGames, BulkGame } from "api/src";
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

export const GamesList: FC<{}> = () => {
  const [games, setGames] = useState<Array<BulkGame>>([]);
  const [search, setSearch] = useState<string>("");
  const windowSize = useWindowSize();
  const cardsPerRow = Math.floor((windowSize.width || 700) / 500);

  useEffect(() => {
    getGames(search).then((responseGames: Array<BulkGame>) =>
      setGames(responseGames)
    );
  }, [search]);

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
          <FlexRow key={idx}>{...arr}</FlexRow>
        ))}
    </div>
  );
};
