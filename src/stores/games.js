// src/stores/games.js
import { writable } from "svelte/store";
import { games as mockGames } from "../data/mockGames.js";

/**
 * games.js
 *
 * Description:
 * This store manages the global list of games. It includes fields to store detailed game data and provides methods
 * to manipulate the game list. This setup is ready to be connected to a backend with minimal changes.
 *
 * For Backend Integration:
 * - Replace the initial value (`mockGames`) with data fetched from a backend.
 * - Add `fetchGames` and `saveGame` functions to handle API requests.
 */

export const games = writable(mockGames);


// Debugging: Log the initial state
games.subscribe(($games) => {
  console.log("games store initialized:", $games); // Check for correct data structure
});

/**
 * For Backend:
 * Add functions like the following:
 *
 * async function fetchGames() {
 *   const response = await fetch("BACKEND_URL/games");
 *   const data = await response.json();
 *   games.set(data);
 * }
 *
 * async function saveGame(newGame) {
 *   const response = await fetch("BACKEND_URL/games", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify(newGame),
 *   });
 *   const data = await response.json();
 *   games.update((current) => [...current, data]);
 * }
 */
