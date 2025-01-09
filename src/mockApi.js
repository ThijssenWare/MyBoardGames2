// src/mockApi.js
import { users } from "./data/mockUsers"; // Import mock user data
import { games } from "./data/mockGames"; // Import mock game data
import { userGames } from "./data/userGames"; // Import mock user-games relationship data
import { get } from "svelte/store"; // For accessing writable store values
import { selectedLanguage } from "./stores/languages";

// Simulate a delay for async operations (to mimic network latency)
const simulateDelay = (result, delay = 500) =>
  new Promise((resolve) => setTimeout(() => resolve(result), delay));

// Mock API for user authentication
export const login = async (email, password) => {
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    return simulateDelay({
      success: true,
      token: `mock-token-${user.id}`,
      user,
    });
  } else {
    return simulateDelay({
      success: false,
      error: "Invalid email or password.",
    });
  }
};

// Mock API for fetching games owned by a user
export const fetchUserGames = async (userId) => {
  const ownedGames = userGames
    .filter((ug) => ug.userId === userId)
    .map((ug) => {
      const game = games.find((g) => g.id === ug.gameId); // Match game by ID
      const language = get(selectedLanguage).code; // Use the currently selected language
      return { ...game, ownedLanguage: language }; // Add the language info
    });
  return simulateDelay(ownedGames);
};

// Mock API for adding a game to a user's collection
export const addUserGame = async (userId, gameId, languageCode) => {
  const alreadyExists = userGames.find(
    (ug) => ug.userId === userId && ug.gameId === gameId && ug.languageCode === languageCode
  );

  if (alreadyExists) {
    return simulateDelay({
      success: false,
      error: "You already own this game in this language.",
    });
  }

  userGames.push({ userId, gameId, languageCode });
  return simulateDelay({ success: true });
};

// Mock API for updating game details------------------------------------------------------------
export const updateGame = async (gameId, updatedFields) => {
  const gameIndex = games.findIndex((g) => g.id === gameId);
  if (gameIndex === -1) {
    return simulateDelay({ success: false, error: "Game not found." });
  }

  games[gameIndex] = { ...games[gameIndex], ...updatedFields };
  return simulateDelay({ success: true, game: games[gameIndex] });
};

// Mock API for deleting a game from a user's collection
export const deleteUserGame = async (userId, gameId) => {
  const index = userGames.findIndex(
    (ug) => ug.userId === userId && ug.gameId === gameId
  );
  if (index === -1) {
    return simulateDelay({
      success: false,
      error: "Game not found in your collection.",
    });
  }

  userGames.splice(index, 1); // Remove the game from the collection
  return simulateDelay({ success: true });
};

// Mock API for fetching all games (with optional filters)
export const fetchGames = async (filters = {}) => {
  let filteredGames = [...games];

  if (filters.language) {
    filteredGames = filteredGames.filter((g) => g.language === filters.language);
  }

  if (filters.mode) {
    filteredGames = filteredGames.filter((g) => g.mode === filters.mode);
  }

  if (filters.category) {
    filteredGames = filteredGames.filter((g) =>
      g.categories.includes(filters.category)
    );
  }

  return simulateDelay(filteredGames);
};

// Mock API for registering a new user
export const register = async (username, email, password) => {
  const emailExists = users.find((u) => u.email === email);
  if (emailExists) {
    return simulateDelay({
      success: false,
      error: "Email is already registered.",
    });
  }

  const newUser = {
    id: users.length + 1,
    username,
    email,
    password, // In production, NEVER store plain text passwords!
  };

  users.push(newUser);
  return simulateDelay({
    success: true,
    user: newUser,
  });
};
