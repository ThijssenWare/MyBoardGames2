import { writable } from 'svelte/store';

// Default filters structure
const defaultFilters = {
  mode: 'All',
  numPlayers: 0,
  rating: 0,
  categories: [],
  language: 'All',
  owner: 'All',
  myGamesOnly: false,
  householdOnly: false,
};

// Load filters from localStorage or fallback to defaults
const storedFilters = JSON.parse(localStorage.getItem('filters')) || defaultFilters;

export const filters = writable(storedFilters);

// Subscribe to store changes and persist to localStorage
filters.subscribe(($filters) => {
  localStorage.setItem('filters', JSON.stringify($filters));
});
