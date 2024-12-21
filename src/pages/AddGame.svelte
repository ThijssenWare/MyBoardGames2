<!--
AddGame.svelte

Description:
This is the main page for adding a new game. It orchestrates the game addition process by integrating the `GameSearch`, `GameDetails`, and `GamePreview` components. It manages the state for the current game being added.

Dependencies:
- `Header.svelte` from `src/components/Header.svelte` (provides a reusable header)
- `GameSearch.svelte` from `src/components/GameSearch.svelte` (handles game search and selection)
- `GameDetails.svelte` from `src/components/GameDetails.svelte` (handles form input for game details)
- `GamePreview.svelte` from `src/components/GamePreview.svelte` (displays a preview of the game)
- `games` from `src/stores/games.js` (global store for game data)
-->

<!--
AddGame.svelte

Description:
This is the main page for adding a new game. It orchestrates the game addition process by integrating the `GameSearch`, `GameDetails`, and `GamePreview` components. It manages the state for the current game being added.

Dependencies:
- `Header.svelte` from `src/components/Header.svelte` (provides a reusable header)
- `GameSearch.svelte` from `src/components/GameSearch.svelte` (handles game search and selection)
- `GameDetails.svelte` from `src/components/GameDetails.svelte` (handles form input for game details)
- `GamePreview.svelte` from `src/components/GamePreview.svelte` (displays a preview of the game)
- `bggAPI.js` from `src/utils/bggAPI.js` (utility for fetching data from the BoardGameGeek API)
- `games` from `src/stores/games.js` (global store for game data)

Inputs:
- None (manages all state internally)

Outputs:
- Saves the new game to the `games` store when the user completes the process
-->

<script>
    import Header from "../components/Header.svelte";
    import { games } from "../stores/games.js";
    import GameSearch from "../components/GameSearch.svelte";
    import GameDetails from "../components/GameDetails.svelte";
    import GamePreview from "../components/GamePreview.svelte";
  
    let step = 1;
    let newGame = {};
    let selectedFromBGG = false;
  
    const resetForm = () => {
      newGame = {};
      selectedFromBGG = false;
      step = 1;
    };
  
    const saveGame = () => {
      games.update((current) => [
        ...current,
        { ...newGame, id: Date.now().toString() },
      ]);
      resetForm();
    };
  </script>
  
  <Header /> <!-- Ensure Header is at the top -->
  <div class="add-game-container">
    <h1>Add a New Game</h1>
    {#if step === 1}
      <GameSearch bind:newGame bind:step bind:selectedFromBGG />
    {:else if step === 2}
      <GameDetails bind:newGame bind:step {selectedFromBGG} />
    {:else if step === 3}
      <GamePreview bind:newGame {resetForm} on:saveGame={saveGame} />
    {/if}
  </div>
  
  
  <style>
    .add-game-container {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
      background: #f9f9f9;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
  </style>
  