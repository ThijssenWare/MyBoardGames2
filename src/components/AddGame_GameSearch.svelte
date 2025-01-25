<script>
  import "../styles/GameSearch_Style.css";
  import { fetchBGGData, fetchBGGDetails } from "../utils/bggAPI.js";
  import { games } from "../stores/games.js"; // Import the global games store
  import { get } from "svelte/store"; // To access the current state of the store

  export let newGame;
  export let step;
  export let selectedFromBGG;

  let gameName = ""; // User's search input
  let searchResults = []; // Results fetched from the BGG API
  let potentialDuplicates = []; // Store duplicates
  let showDuplicates = false; // Toggle duplicate modal
  let duplicateWarning = false; // Show warning when clicking a duplicate

  // Check for duplicates dynamically
  const updatePotentialDuplicates = () => {
    const allGames = get(games); // Get the current list of games
    potentialDuplicates = allGames.filter(
      (existingGame) =>
        existingGame.name.toLowerCase() === gameName.toLowerCase()
    );
  };

  const handleGameSelected = async (game) => {
    updatePotentialDuplicates(); // Ensure duplicates are checked with the latest state

    if (game === "custom") {
      // Custom game logic
      selectedFromBGG = false;
      showDuplicates = potentialDuplicates.length > 0;
      if (!showDuplicates) step = 2; // Proceed only if no duplicates
    } else {
      // Selected from BGG logic
      const isDuplicate = potentialDuplicates.some(
        (duplicate) => duplicate.id === game.id
      );
      if (isDuplicate) {
        showDuplicateWarning();
        return;
      }

      selectedFromBGG = true;
      const details = await fetchBGGDetails(game.id);
      newGame = {
        id: game.id,
        name: game.name,
        minPlayers: details.minPlayers,
        maxPlayers: details.maxPlayers,
        bggUrl: details.bggUrl,
        imageUrl: details.imageUrl,
        description: details.description,
        bestWithXPlayers: details.bestWithXPlayers,
        minPlaytime: details.minPlaytime,
        maxPlaytime: details.maxPlaytime,
        averagePlaytime: details.averagePlaytime,
        designer: details.designer,
        artist: details.artist,
        publisher: details.publisher,
        popByBGG: true,
        language: "",
        personalRating: "",
        lastPlayed: "",
        mode: "",
        dutchDescription: "",
        categories: [],
      };

      updatePotentialDuplicates(); // Check for duplicates again
      showDuplicates = potentialDuplicates.length > 0;
      if (!showDuplicates) step = 2; // Proceed only if no duplicates
    }
  };

  const handleDuplicateResolution = (selectedOption) => {
    if (selectedOption === "new") {
      step = 2; // Mark as new and proceed
    } else {
      newGame = { ...newGame, ...selectedOption }; // Merge duplicate details
      step = 3;
    }
    showDuplicates = false;
  };

  const showDuplicateWarning = () => {
    duplicateWarning = true;
    setTimeout(() => {
      duplicateWarning = false;
    }, 3000);
  };

  // Fetch search results from BGG API and update duplicates dynamically
  $: {
    if (gameName.trim().length > 0) {
      fetchBGGData(gameName).then((results) => {
        searchResults = results;
        updatePotentialDuplicates(); // Update potential duplicates when results change
      });
    } else {
      searchResults = []; // Clear search results if no input
    }
  }
</script>

<div class="step">
  <label for="gameName">Search for a Game:</label>
  <input
    id="gameName"
    type="text"
    bind:value={gameName}
    placeholder="Enter game name"
  />
  <div class="search-results">
    {#if gameName.trim().length > 0}
      {#if searchResults.length === 0}
        <ul>
          <!-- Custom game option is always shown if there is input but no matches -->
          <li
            class="custom-option"
            on:click={() => handleGameSelected("custom")}
          >
            My game is not in this list
          </li>
        </ul>
        <p>No results found.</p>
      {:else}
        <ul>
          <!-- Custom game option -->
          <li
            class="custom-option"
            on:click={() => handleGameSelected("custom")}
          >
            My game is not in this list
          </li>
          {#each searchResults as game (game.id)}
            <li
              on:click={() => handleGameSelected(game)}
              class:duplicate={potentialDuplicates.some(
                (duplicate) => duplicate.id === game.id
              )}
            >
              {game.name} ({game.year})
            </li>
          {/each}
        </ul>
      {/if}
    {/if}
  </div>

  <!-- Duplicate Warning -->
  {#if duplicateWarning}
    <div class="warning">
      <p>This game already exists in your list!</p>
    </div>
  {/if}

  <!-- Duplicates Modal -->
  {#if showDuplicates}
    <div class="duplicates-modal">
      <h3>Potential Duplicates Found</h3>
      <ul>
        {#each potentialDuplicates as duplicate (duplicate.id)}
          <li>
            {duplicate.name} ({duplicate.publisher}) - Min Players: {duplicate.minPlayers}, Max Players: {duplicate.maxPlayers}
            <button on:click={() => handleDuplicateResolution(duplicate)}>Update</button>
          </li>
        {/each}
      </ul>
      <button on:click={() => handleDuplicateResolution("new")}>Mark as New</button>
    </div>
  {/if}
</div>

<style>
  .duplicate {
    color: gray;
    text-decoration: line-through;
    cursor: not-allowed;
  }

  .warning {
    background-color: #ffe5e5;
    color: #d9534f;
    border: 1px solid #d9534f;
    padding: 10px;
    border-radius: 5px;
    margin-top: 10px;
    text-align: center;
  }

  .duplicates-modal {
    background: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 15px;
    margin-top: 20px;
  }

  .duplicates-modal button {
    margin-left: 10px;
  }
</style>
