/*
bggAPI.js

Description:
This utility module provides functions to interact with the BoardGameGeek API. It includes methods to fetch search results and other details for board games.

Functions:
- `fetchBGGData(name)`: Fetches search results from the BoardGameGeek API based on a game name.

Inputs:
- `name`: A string representing the game name to search for

Outputs:
- Returns an array of search results, each containing:
  - `id`: Unique ID of the game
  - `name`: Name of the game
  - `year`: Year the game was published

Dependencies:
- None
*/


export async function fetchBGGData(name) {
    if (!name) return [];

    const url = `https://boardgamegeek.com/xmlapi2/search?query=${encodeURIComponent(name)}&type=boardgame`;
    try {
        const response = await fetch(url);
        const text = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");
        const items = Array.from(xmlDoc.getElementsByTagName("item"));

        return items.map((item) => ({
            id: item.getAttribute("id"),
            name: item.querySelector("name")?.getAttribute("value") || "Unknown",
            year: item.querySelector("yearpublished")?.getAttribute("value") || "Unknown",
        }));
    } catch (error) {
        console.error("Error fetching data from BGG:", error);
        return [];
    }
}
