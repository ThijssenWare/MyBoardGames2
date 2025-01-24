// src/utils/mock_CRUD_API.js

// Import mock data for now
import { games as mockGames } from "../data/mockGames.js";

// Simulate a database with a simple array
let gamesDB = [...mockGames];

// Simulate network latency
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// CRUD operations
export const mockCRUDAPI = {
  // Fetch all games
  async fetchGames() {
    await delay(500); // Simulate API latency
    return [...gamesDB]; // Return a copy of the games array
  },

  // Add a new game
  async addGame(game) {
    await delay(500); // Simulate API latency
    const newGame = { ...game, id: Date.now().toString() }; // Generate unique ID
    gamesDB.push(newGame);
    return newGame; // Return the newly created game
  },

  // Update an existing game by ID <<<<<<<<<<<<<<<<<NOT YET IMPLEMENTED>>>>>>>>>>>>>>>>>>>
  async updateGame(gameId, updatedData) {
    await delay(500); // Simulate API latency
    const index = gamesDB.findIndex((game) => game.id === gameId);
    if (index === -1) throw new Error("Game not found");
    gamesDB[index] = { ...gamesDB[index], ...updatedData };
    return gamesDB[index]; // Return the updated game
  },

  // Delete a game by ID <<<<<<<<<<<<<<<<<NOT YET IMPLEMENTED>>>>>>>>>>>>>>>>>>>
  async deleteGame(gameId) {
    await delay(500); // Simulate API latency
    const index = gamesDB.findIndex((game) => game.id === gameId);
    if (index === -1) throw new Error("Game not found");
    const [deletedGame] = gamesDB.splice(index, 1);
    return deletedGame; // Return the deleted game
  },
};
