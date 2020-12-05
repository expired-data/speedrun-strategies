import React, { useState, useEffect, FC, FormEvent } from "react";
import styled from "styled-components";
import { getGames, BulkGame } from "api/src";
import { GameCard } from "./GameCard";
import { Search } from "components/Search";

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const GamesList: FC<{}> = () => {
  const [games, setGames] = useState<Array<BulkGame>>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    getGames(search).then((responseGames: Array<BulkGame>) =>
      setGames(responseGames)
    );
  }, [search]);

  return (
    <div>
      <FlexRow>
        <h1>Games {search && `(${search})`}</h1>
        <SearchContainer data-testid="search">
          <Search onSearch={setSearch} />
        </SearchContainer>
      </FlexRow>
      {games.map((game) => (
        <GameCard game={game} key={game.id} />
      ))}
    </div>
  );
};
