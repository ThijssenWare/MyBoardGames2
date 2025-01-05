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
  import { loggedIn } from "../stores/auth"; // Importing the global loggedIn store
  import { games } from "../stores/games"; // Import the global games store

  // Variables passed from the parent
  export let searchQuery = ""; // Search input to filter games
  export let sortBy = "name"; // Sorting field
  export let sortOrder = "asc"; // Sorting order ("asc" or "desc")

  let filteredGames = [];

  // Watch for changes to the games store and local search/sort variables
  $: {
    const query = searchQuery.toLowerCase();
    filteredGames = $games
      .filter((game) => game.name?.toLowerCase().includes(query)) // Filter based on search query
      .sort((a, b) => {
        const fieldA = (a[sortBy] || "").toString().toLowerCase(); // Fallback for undefined fields
        const fieldB = (b[sortBy] || "").toString().toLowerCase();
        
        // If sorting by 'rating', convert ratings to numbers
        if (sortBy === "rating") {
          const ratingA = parseFloat(a.personalRating) || 0; // Parse the rating as a float
          const ratingB = parseFloat(b.personalRating) || 0; // Parse the rating as a float
          
          if (ratingA < ratingB) return sortOrder === "asc" ? -1 : 1;
          if (ratingA > ratingB) return sortOrder === "asc" ? 1 : -1;
          return 0;
        }

        // Default comparison for other fields
        if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
        if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
  }

  // Function to navigate to GameDetails
  const goToDetails = (id) => {
    console.log(`Navigating to details of game with id: ${id}`);
    navigate(`/game-details/${id}`);
  };

  // Function to navigate to the "Add Game" page
  const goToAddGame = () => {
    console.log("Navigating to Add Game page");
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

<!-- Sorting Options with Add Game Button -->
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
      title="Add Game"
      on:click={goToAddGame}
      aria-label="Add a new game"
    >
      ➕
    </button>
  {/if}
</div>

<!-- Game List -->
<div class="games-list">
  {#if filteredGames.length > 0}
    {#each filteredGames as game}
      <!-- Game Row -->
      <div
        class="game-row"
        on:click={() => goToDetails(game.id)}
        tabindex="0"
        role="button"
        aria-label={`View details for ${game.name}`}
      >
        <img class="game-thumbnail" src={game.imageUrl} alt={game.name} />
        <div class="game-info">
          <h3>{game.name}</h3>
          <p>Rating: {game.personalRating}</p>
        </div>
        <button
          class="view-details"
          on:click|stopPropagation={() => goToDetails(game.id)}
        >
          View Details
        </button>
      </div>
    {/each}
  {:else}
    <p>No games found matching your search.</p>
  {/if}
</div>



  