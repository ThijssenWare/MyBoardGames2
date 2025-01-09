// Default filters structure
import { categoryOptions } from './categoryOptions'; // Import the list of categories

export const defaultFilters = {
  mode: 'All',
  numPlayers: 0,
  rating: 0,
  categories: [...categoryOptions], // Default to all categories being selected
  language: 'All',
  owner: 'All',
  myGamesOnly: false,
  householdOnly: false,
  categoryFilterType: 'OR', // Default filter type is "OR"
};
