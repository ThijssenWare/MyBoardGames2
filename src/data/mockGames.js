// src/data/mockGames.js

/**
 * mockGames.js
 *
 * Description:
 * Provides mock data for the initial games list with expanded fields to include detailed game information.
 */

export const games = [
    {
      id: "0",
      name: "Catan",
      language: "English",
      personalRating: "8.5",
      lastPlayed: "2023-10-15",
      minPlayers: "3",
      maxPlayers: "4",
      bggUrl: "https://boardgamegeek.com/boardgame/13/catan",
      imageUrl: "/assets/catan.jpg",
      tag: "competitive",
      description: "A game of trading and building.",
      dutchDescription: "Een spel van handel en bouwen.",
      categories: ["Strategy", "Resource Management"],
      designer: "Klaus Teuber",
      artist: "Michael Menzel",
      publisher: "Kosmos",
      expansions: [],
      minPlaytime: "60",
      maxPlaytime: "120",
      averagePlaytime: "90",
      bestWithXPlayers: "4",
      categoryDescription: "A resource management strategy game.",
    },
    {
      id: "1",
      name: "Pandemic",
      language: "English",
      personalRating: "9.2",
      lastPlayed: "2023-12-01",
      minPlayers: "2",
      maxPlayers: "4",
      bggUrl: "https://boardgamegeek.com/boardgame/30549/pandemic",
      imageUrl: "/assets/pandemic.jpg",
      tag: "cooperative",
      description: "A cooperative game about stopping diseases.",
      dutchDescription: "Een coöperatief spel over het stoppen van ziektes.",
      categories: ["Cooperative", "Strategy"],
      designer: "Matt Leacock",
      artist: "Chris Quilliams",
      publisher: "Z-Man Games",
      expansions: ["On the Brink", "In the Lab"],
      minPlaytime: "45",
      maxPlaytime: "60",
      averagePlaytime: "50",
      bestWithXPlayers: "4",
      categoryDescription: "Work together to stop global outbreaks.",
    },
  ];
  