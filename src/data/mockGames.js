// src/data/mockGames.js

/** 
 * mockGames.js

## Folder Structure:
- src/data/mockGames.js

## Description:
This file provides mock data for games, including their details like name, players, rating, and tags.

## Variables Exported:
- `games` (array): An array of game objects with the following properties:
    - id (number)
    - name (string)
    - language (string)
    - rating (number)
    - lastplayed (string)
    - minplayers (number)
    - maxplayers (number)
    - bggurl (string)
    - imageurl (string)
    - tag (string)
    - category (array): List of categories the game belongs to
    - owner (array): List of owners of the game

## Variables Expected:
- None.

## Dependencies:
- None.
*/

export const games = [
    {
        id: 0,
        name: "Catan",
        language: "English",
        rating: 8.5,
        lastplayed: "2023-10-15",
        minplayers: 3,
        maxplayers: 4,
        bggurl: "https://boardgamegeek.com/boardgame/13/catan",
        imageurl: "/assets/catan.jpg",
        tag: "competitive",
        category: ["Strategy", "Resource Management"],
        owner: ["Alice", "Bob"],
    },
    {
        id: 1,
        name: "Pandemic",
        language: "English",
        rating: 9.2,
        lastplayed: "2023-12-01",
        minplayers: 2,
        maxplayers: 4,
        bggurl: "https://boardgamegeek.com/boardgame/30549/pandemic",
        imageurl: "/assets/pandemic.jpg",
        tag: "cooperative",
        category: ["Cooperative", "Strategy"],
        owner: ["Alice"],
    },
    {
        id: 2,
        name: "Ticket to Ride",
        language: "English",
        rating: 8.0,
        lastplayed: "2023-11-10",
        minplayers: 2,
        maxplayers: 5,
        bggurl: "https://boardgamegeek.com/boardgame/9209/ticket-ride",
        imageurl: "/assets/ttr.jpg",
        tag: "competitive",
        category: ["Family", "Railroad"],
        owner: ["Charlie"],
    },
    {
        id: 3,
        name: "Ticket to Stride",
        language: "English",
        rating: 8.0,
        lastplayed: "2023-11-10",
        minplayers: 2,
        maxplayers: 5,
        bggurl: "https://boardgamegeek.com/boardgame/9209/ticket-ride",
        imageurl: "https://t4.ftcdn.net/jpg/00/56/96/27/360_F_56962791_o8syVNM8Ojo19TxJhLy1JW6RPHOin2zS.jpg",
        tag: "competitive",
        category: ["Family", "Railroad"],
        owner: ["Charlie"],
    },
];
