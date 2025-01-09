<!-- 
    File: src/components/GameList.svelte

    Description:
    This component renders a list of games based on the filtered games and user inputs like search query and sorting preferences.
-->

<script>
  import "../styles/GameList_Style.css"; // Import the styles
  import { navigate } from "../stores/routes";
  import { loggedIn } from "../stores/auth";
  import { games } from "../stores/games"; // Import games store
  import { filters } from '../stores/filters'; // Import persistent filters store

  export let searchQuery = ""; // Search query for filtering games
  export let sortBy = "name";  // Sort field (e.g., "name", "rating")
  export let sortOrder = "asc"; // Sort order ("asc" or "desc")

  let filteredGames = [];

  /**
   * Reactive filtering logic:
   * This block will recompute whenever any of the following variables change:
   * - $games (games store)
   * - $filters (filters store)
   * - searchQuery, sortBy, or sortOrder
   */
  $: {
    const query = searchQuery.toLowerCase();
    const categoryFilterType = $filters.categories.length ? $filters.categoryFilterType : 'OR'; // Get selected category filter type (OR/AND)

    filteredGames = $games
      .filter((game) => {
        // Convert fields to numbers for accurate comparisons
        const gameRating = parseFloat(game.personalRating) || 0;
        const minPlayers = parseInt(game.minPlayers) || 0;
        const maxPlayers = parseInt(game.maxPlayers) || Infinity;

        // Ensure game object exists and has required properties
        if (!game || !game.name) return false;

        const matchesSearch = game.name.toLowerCase().includes(query);
        const matchesMode = $filters.mode === "All" || game.mode === $filters.mode;
        const matchesNumPlayers =
          $filters.numPlayers === 0 ||
          ($filters.numPlayers >= minPlayers && $filters.numPlayers <= maxPlayers);
        const matchesRating = gameRating >= $filters.rating;
        
        // Apply AND/OR logic for categories
        let matchesCategories = false;
        if ($filters.categories.length > 0) {
          if (categoryFilterType === 'OR') {
            // If OR, game matches if it has at least one selected category
            matchesCategories = $filters.categories.some((cat) => 
              game.categories?.some(gameCategory => gameCategory.toLowerCase() === cat.toLowerCase())
            );
          } else if (categoryFilterType === 'AND') {
            // If AND, game matches only if it has all selected categories
            matchesCategories = $filters.categories.every((cat) => 
              game.categories?.some(gameCategory => gameCategory.toLowerCase() === cat.toLowerCase())
            );
          }
        } else {
          matchesCategories = true; // No category filter selected, so match all
        }

        const matchesLanguage = $filters.language === "All" || game.language === $filters.language;
        const matchesOwner = $filters.owner === "All" || game.owner === $filters.owner;

        return (
          matchesSearch &&
          matchesMode &&
          matchesNumPlayers &&
          matchesRating &&
          matchesCategories &&
          matchesLanguage &&
          matchesOwner
        );
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

        return fieldA < fieldB
          ? sortOrder === "asc"
            ? -1
            : 1
          : fieldA > fieldB
          ? sortOrder === "asc"
            ? 1
            : -1
          : 0;
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
      <!-- Ensure valid game object is rendered -->
      {#if game}
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
      {/if}
    {/each}
  {:else}
    <p>No games found matching your search and filters.</p>
  {/if}
</div>

