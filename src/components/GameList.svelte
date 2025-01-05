<!-- 
GameList.svelte

## Folder Structure:
- src/components/GameList.svelte

## Description:
This component renders a list of games based on the filtered games and user inputs like search query and sorting preferences.

## Variables Exported:
- None.

## Variables Expected:
- searchQuery (string): Search input to filter games.
- sortBy (string): Field used for sorting the games.
- sortOrder (string): Order for sorting ("asc" or "desc").

## Dependencies:
- `navigate` from `stores/routes`: For navigation between pages.
- `loggedIn` from `stores/auth`: Global store to check logged-in status.
- `games` from `stores/games`: Global store holding the list of games.
-->
<!-- GameList.svelte -->
<script>
  import "../styles/GameList_Style.css"; // Import the styles
  import { navigate } from "../stores/routes";
  import { loggedIn } from "../stores/auth";
  import { games } from "../stores/games";

  export let searchQuery = ""; // Search query for filtering games
  export let sortBy = "name";  // Sort field (e.g., "name", "rating")
  export let sortOrder = "asc"; // Sort order ("asc" or "desc")
  export let filters = {};  // Filters object passed from Home.svelte

  let filteredGames = [];

  // Default filter values to allow all games to be shown
  const defaultFilters = {
    mode: "All",
    numPlayers: 0,
    rating: 0,
    categories: [],
    language: "All",
    owner: "All",
    myGamesOnly: false,
    householdOnly: false,
  };

  // Merge the passed filters with default values
  filters = { ...defaultFilters, ...filters };

  // Watch for changes to games store, search, sort, or filters
  $: {
    const query = searchQuery.toLowerCase();
    filteredGames = $games
      .filter((game) => {
        const matchesSearch = game.name?.toLowerCase().includes(query);
        const matchesMode = filters.mode === "All" || game.mode === filters.mode;
        const matchesNumPlayers = filters.numPlayers === 0 || (filters.numPlayers >= game.minPlayers && filters.numPlayers <= game.maxPlayers);
        const matchesRating = game.personalRating >= filters.rating;
        const matchesCategories = filters.categories.length === 0 || filters.categories.some((cat) => game.categories.includes(cat));
        const matchesLanguage = filters.language === "All" || game.language === filters.language;
        const matchesOwner = filters.owner === "All" || game.owner === filters.owner;

        return matchesSearch && matchesMode && matchesNumPlayers && matchesRating && matchesCategories && matchesLanguage && matchesOwner;
      })
      .sort((a, b) => {
        const fieldA = (a[sortBy] || "").toString().toLowerCase();
        const fieldB = (b[sortBy] || "").toString().toLowerCase();

        // Sorting by rating or other fields
        if (sortBy === "rating") {
          const ratingA = parseFloat(a.personalRating) || 0;
          const ratingB = parseFloat(b.personalRating) || 0;
          return sortOrder === "asc" ? ratingA - ratingB : ratingB - ratingA;
        }

        return fieldA < fieldB ? (sortOrder === "asc" ? -1 : 1) : fieldA > fieldB ? (sortOrder === "asc" ? 1 : -1) : 0;
      });
  }

  const goToDetails = (id) => {
    navigate(`/game-details/${id}`);
  };

  const goToAddGame = () => {
    navigate("/add-game");
  };
</script>

<!-- Search Bar -->
<div class="search-bar">
  <input
    type="text"
    placeholder="Search games..."
    bind:value={searchQuery}
  />
</div>

<!-- Sorting Options -->
<div class="sorting">
  <label>
    Sort By:
    <select bind:value={sortBy}>
      <option value="name">Name</option>
      <option value="rating">Rating</option>
    </select>
  </label>

  <label>
    Order:
    <select bind:value={sortOrder}>
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
  </label>

  {#if $loggedIn}
    <!-- Add Game Button -->
    <button
      class="add-game-button"
      on:click={goToAddGame}
    >
      ➕
    </button>
  {/if}
</div>

<!-- Game List -->
<div class="games-list">
  {#if filteredGames.length > 0}
    {#each filteredGames as game}
      <div
        class="game-row"
        on:click={() => goToDetails(game.id)}
      >
        <img class="game-thumbnail" src={game.imageUrl} alt={game.name} />
        <div class="game-info">
          <h3>{game.name}</h3>
          <p>Rating: {game.personalRating}</p>
        </div>
        <button on:click|stopPropagation={() => goToDetails(game.id)}>
          View Details
        </button>
      </div>
    {/each}
  {:else}
    <p>No games found matching your search and filters.</p>
  {/if}
</div>
