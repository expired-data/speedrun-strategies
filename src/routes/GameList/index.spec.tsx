import React from "react"; 
import { findAllByRole, findByText, fireEvent, render, waitFor } from "@testing-library/react"; 

import type { BulkGame } from "api/src"; 
import { GamesList } from "./"; 

import { getGames } from "api/src"; 
import { GameCard } from "./GameCard"; 

const MOCK_GAMES: Array<BulkGame> = [{ 
    abbreviation: "", 
    id: "abcdefg", 
    names: { 
        international: "test game", 
        japanese: null 
    },
    weblink: ""
}, 
{ 
    abbreviation: "", 
    id: "abcdefh", 
    names: { 
        international: "test game 2", 
        japanese: null 
    },
    weblink: ""
},
{ 
    abbreviation: "", 
    id: "abcdefi", 
    names: { 
        international: "test game 3", 
        japanese: null 
    },
    weblink: ""
}] 

jest.mock("./GameCard", () => ({ 
    __esModule: true,
    GameCard: jest.fn(({game}: {game: BulkGame}) => { 
        return <div>{game.id}</div>; 
    })
}));

jest.mock("api/src", () => ({ 
    __esModule: true,
    getGames: jest.fn((searchTerm?: string): Promise<Array<BulkGame>> => { 
        return Promise.resolve(MOCK_GAMES); 
    })
}));

test("GamesList renders games cards from SRC api", async () => { 
    const { findByText } = render(<GamesList />);
    for(let i = 0; i < MOCK_GAMES.length; i++) { 
        await findByText(MOCK_GAMES[i].id);
    }
    expect(getGames).toHaveBeenCalled(); 
    expect(GameCard).toHaveBeenCalledTimes(3);
})

test("GamesList calls SRC api with search term when a search term is entered", async () => { 
    const SEARCH_TERM = "search_term"; 
    const { findByText, getByTestId } = render(<GamesList />);
    for(let i = 0; i < MOCK_GAMES.length; i++) { 
        await findByText(MOCK_GAMES[i].id);
    }
    const searchContainer = getByTestId("search"); 
    (searchContainer.querySelector('input') as HTMLInputElement).value = SEARCH_TERM;
    fireEvent.click(searchContainer.querySelector('button') as HTMLButtonElement); 
    
    for(let i = 0; i < MOCK_GAMES.length; i++) { 
        await findByText(MOCK_GAMES[i].id);
    }

    expect(getGames).toHaveBeenCalledWith(SEARCH_TERM);
})