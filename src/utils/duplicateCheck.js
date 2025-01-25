import { stringSimilarity } from "string-similarity-js"; // Fuzzy matching library

/**
 * checkDuplicates
 *
 * Description:
 * Checks for potential duplicates in the games database. It prioritizes matching by BGG ID for BGG games and uses fuzzy matching for non-BGG games.
 *
 * @param {Object} game - The game object to check for duplicates.
 * @param {Array} gamesDB - The current games database array.
 * @returns {Array} - A list of potential duplicates.
 */
export function checkDuplicates(game, gamesDB) {
  try {
    // Check for duplicates by BGG ID if the game has an ID
    if (game.id) {
      return gamesDB.filter((dbGame) => dbGame.id === game.id);
    }

    // For non-BGG games, use fuzzy name matching
    const threshold = 0.7; // Define a similarity threshold
    return gamesDB.filter((dbGame) => {
      const nameSimilarity = stringSimilarity.compareTwoStrings(
        game.name.toLowerCase(),
        dbGame.name.toLowerCase()
      );
      return nameSimilarity >= threshold;
    });
  } catch (error) {
    console.error("Error checking duplicates:", error);
    return [];
  }
}
