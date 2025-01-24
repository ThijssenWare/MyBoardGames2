// src/stores/games.js
import { writable } from "svelte/store";
import { mockCRUDAPI } from "../utils/mock_CRUD_API.js"; // Import the centralized CRUD API

/**
 * games.js
 *
 * Description:
 * This store manages the global list of games using the centralized mockCRUDAPI.
 * It supports fetching, adding, updating, and deleting games.
 */

export const games = writable([]); // Initialize with an empty array


// Fetch games from the API and populate the store
export const fetchGames = async () => {
  try {
    const fetchedGames = await mockCRUDAPI.fetchGames();
    games.set(fetchedGames);
  } catch (error) {
    console.error("Failed to fetch games:", error);
  }
};

// Add a new game
export const addGame = async (game) => {
  try {
    const newGame = await mockCRUDAPI.addGame(game);
    games.update((currentGames) => [...currentGames, newGame]); // Add to the store
  } catch (error) {
    console.error("Failed to add game:", error);
  }
};

// Update an existing game
export const updateGame = async (gameId, updatedData) => {
  try {
    const updatedGame = await mockCRUDAPI.updateGame(gameId, updatedData);
    games.update((currentGames) =>
      currentGames.map((game) => (game.id === gameId ? updatedGame : game))
    ); // Update in the store
  } catch (error) {
    console.error("Failed to update game:", error);
  }
};

// Delete a game
export const deleteGame = async (gameId) => {
  try {
    await mockCRUDAPI.deleteGame(gameId);
    games.update((currentGames) =>
      currentGames.filter((game) => game.id !== gameId)
    ); // Remove from the store
  } catch (error) {
    console.error("Failed to delete game:", error);
  }
};

// Fetch games initially when the app loads
fetchGames();
