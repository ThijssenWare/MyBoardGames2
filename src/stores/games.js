// src/stores/games.js
import { writable } from "svelte/store";
import { games as mockGames } from "../data/mockGames.js";

export const games = writable(mockGames);
