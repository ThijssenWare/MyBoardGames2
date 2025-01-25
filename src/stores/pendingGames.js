import { writable } from "svelte/store";

export const pendingGames = writable([]);

// Function to add a game to the pending queue
export function addPendingGame(game) {
    pendingGames.update((games) => [...games, game]);
}

// Function for admin to approve a game
export function approveGame(gameId) {
    pendingGames.update((games) => games.filter((game) => game.id !== gameId));
}

// Function for admin to deny a game
export function denyGame(gameId) {
    pendingGames.update((games) => games.filter((game) => game.id !== gameId));
}
