import { getGames } from "./src";
import fetch from "node-fetch";

if (!globalThis.fetch) {
    globalThis.fetch = (fetch as unknown) as (input: RequestInfo, init?: RequestInit | undefined) => Promise<Response>;
}

expect.extend({ 
    stringOrNull(received: any) { 
        return received === null || typeof received === 'string' ? {
            message: () => `expected ${received} to be string or null`,
            pass: true
        } : {
            message: () => `expected ${received} to be string or null`,
            pass: false
        };
    }
})

test("calling get games gives a set of game objects", async () => { 
    expect((await getGames())[0]).toEqual(expect.objectContaining( 
        {
            abbreviation: expect.any(String), 
            id: expect.any(String), 
            names: expect.objectContaining({ international: expect.any(String), japanese: ((expect as unknown) as {stringOrNull: () => {}}).stringOrNull()}),
            weblink: expect.any(String), 
        }
    )); 
})