<!--
AddGame_GameSearch.svelte

Description:
This component handles the search functionality for finding games using the BoardGameGeek API. It dynamically fetches and displays search results based on user input. It allows the user to select a game or choose to add a custom game.

Dependencies:
- `fetchBGGData` from `src/utils/bggAPI.js` (fetches game search results from BoardGameGeek API)

Inputs:
- `newGame`: A bound object to hold game details for the selected or custom game
- `step`: Bound variable to track the current step in the process
- `selectedFromBGG`: Bound boolean to indicate if the game is selected from BGG or custom

Outputs:
- Updates `newGame` with selected game details
- Sets `step` to proceed to the next step
-->

<script>
    import "../styles/GameSearch_Style.css"; // Import the styles
    import { fetchBGGData, fetchBGGDetails } from "../utils/bggAPI.js";
  
    export let newGame;
    export let step;
    export let selectedFromBGG;
  
    let gameName = "";
    let searchResults = [];
  
    const handleGameSelected = async (game) => {
      if (game === "custom") {
        selectedFromBGG = false;
        step = 2;
      } else {
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
        step = 2;
      }
    };
  
    $: fetchBGGData(gameName).then((results) => {
      searchResults = results;
    });
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
      {#if searchResults.length === 0}
        <p>No results found.</p>
      {:else}
        <ul>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <li
            class="custom-option"
            on:click={() => handleGameSelected("custom")}
          >
            My game is not in this list
          </li>
          {#each searchResults as game (game.id)}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li on:click={() => handleGameSelected(game)}>
              {game.name} ({game.year})
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
  

  