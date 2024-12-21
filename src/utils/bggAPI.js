/*
bggAPI.js

Description:
This utility module provides functions to interact with the BoardGameGeek API. It includes methods to fetch search results and other details for board games.

Functions:
- `fetchBGGData(name)`: Fetches search results from the BoardGameGeek API based on a game name.
- `fetchBGGDetails(id)`: Fetches detailed information for a specific game by its ID.

Inputs:
- `name`: A string representing the game name to search for
- `id`: The unique ID of the game for fetching details

Outputs:
- `fetchBGGData(name)`: Returns an array of search results, each containing:
  - `id`: Unique ID of the game
  - `name`: Name of the game
  - `year`: Year the game was published
- `fetchBGGDetails(id)`: Returns detailed information about a specific game:
  - `minPlayers`, `maxPlayers`, `bggUrl`, `imageUrl`, `description`, etc.

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
  
  export async function fetchBGGDetails(id) {
    if (!id) return null;
  
    const url = `https://boardgamegeek.com/xmlapi2/thing?id=${id}&stats=1`;
    try {
      const response = await fetch(url);
      const text = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, "text/xml");
      const item = xmlDoc.querySelector("item");
  
      if (!item) return null;
  
      return {
        minPlayers: item.querySelector("minplayers")?.getAttribute("value") || "Unknown",
        maxPlayers: item.querySelector("maxplayers")?.getAttribute("value") || "Unknown",
        bggUrl: `https://boardgamegeek.com/boardgame/${id}`,
        imageUrl: item.querySelector("image")?.textContent || "",
        description: item.querySelector("description")?.textContent || "No description available.",
        bestWithXPlayers: item.querySelector("poll[name='suggested_numplayers'] results[best='true']")?.getAttribute("numplayers") || "N/A",
        minPlaytime: item.querySelector("minplaytime")?.getAttribute("value") || "Unknown",
        maxPlaytime: item.querySelector("maxplaytime")?.getAttribute("value") || "Unknown",
        averagePlaytime: item.querySelector("playingtime")?.getAttribute("value") || "Unknown",
        designer: item.querySelector("link[type='boardgamedesigner']")?.getAttribute("value") || "Unknown",
        artist: item.querySelector("link[type='boardgameartist']")?.getAttribute("value") || "Unknown",
        publisher: item.querySelector("link[type='boardgamepublisher']")?.getAttribute("value") || "Unknown",
      };
    } catch (error) {
      console.error("Error fetching details from BGG:", error);
      return null;
    }
  }
  