<!-- 
Home.svelte

## Folder Structure:
- src/pages/Home.svelte

## Description:
This page serves as the homepage and displays the list of games with filters and sorting functionality.

## Variables Exported:
- None.

## Variables Expected:
- games (imported from `data/mockGames.js`): Array of game objects.
- filters (object): Filter states to determine visible games.
- searchQuery (string): Search input to filter games by name.
- sortBy (string): Determines the sorting field (e.g., "name", "rating").
- sortOrder (string): Determines sort direction ("asc" or "desc").

## Dependencies:
- `Header.svelte`: Renders the page header.
- `Filter.svelte`: Renders the filter sidebar.
- `GameList.svelte`: Displays the list of filtered games.
-->
<script>
  import "../styles/Home_Style.css"; // Import styles
  import { loggedIn } from "../stores/auth"; // Assuming logged-in status is managed via store
  import Header from "../components/Header.svelte";
  import Filter from "../components/Filter.svelte";
  import GameList from "../components/GameList.svelte";

  let filters = {
    mode: "All",
    categories: [],
    numPlayers: 1,
    language: "All",
    owner: "All",
    myGamesOnly: false,
    householdOnly: false,
  };
  let searchQuery = "";
  let sortBy = "name";
  let sortOrder = "asc";
</script>

<Header {loggedIn} />

<div class="container">
  <!-- Sidebar Filter Component -->
  <aside class="filter">
    <Filter bind:filters />
  </aside>

  <!-- Main Game List Component -->
  <main class="game-list">
    <GameList
      bind:searchQuery
      bind:sortBy
      bind:sortOrder
      {filters}
    />
  </main>
</div>

<style>
  :global(body) {
    background-color: rgb(255, 255, 255);
  }

  :global(.container) {
    display: flex;
    background-color: #f9f9f9;
    min-height: 100vh;
    padding: 1rem;
  }

  :global(.filter) {
    width: 25%;
    background-color: #e3f7f7;
    padding: 1rem;
    border-right: 2px solid #ddd;
  }

  :global(.game-list) {
    width: 75%;
    padding: 1rem;
  }
</style>
