// src/stores/categories.js <--------------- only used by Filter.svelte
import { writable } from 'svelte/store';

// List of categories available for selection
export const categories = writable([
    "Deck Builder", "Teams", "Party Game", "Expansion", "RPG",
    "Strategy", "Social Deduction", "Engine Builder", "Worker Placement",
    "Cards", "Puzzle", "For Children", "Family"
]);
