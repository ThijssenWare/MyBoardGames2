<!--
GameSearch.svelte

Description:
This component handles the search functionality for finding games using the BoardGameGeek API. 
It dynamically fetches and displays search results based on user input. It allows the user to 
select a game or choose to add a custom game.

Dependencies:
- `fetchBGGData` from `src/utils/bggAPI.js` (fetches game search results from BoardGameGeek API)
- Expects `gameName` and `searchResults` to be passed in as props
- Expects `onGameSelected` as a callback function to handle the user's game selection

Inputs:
- `gameName`: A string representing the current game search query
- `searchResults`: An array of search results (populated dynamically by `fetchBGGData`)
- `onGameSelected`: Callback function triggered when a game is selected

Outputs:
- Triggers `onGameSelected` with the selected game or "custom" option
-->


<script>
    import { fetchBGGData } from "../utils/bggAPI.js"; // Importing the BGG data fetching utility
    import { games } from "../stores/games";
    export let gameName;
    export let searchResults;
    export let onGameSelected; // Callback for handling game selection

    // Fetches games from BGG whenever the gameName changes
    $: fetchBGGData(gameName).then(results => {
        searchResults = results;
    });
</script>

<div class="step">
    <label for="gameName">Game Name:</label>
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
                {#each searchResults as game (game.id)}
                    <li on:click={() => onGameSelected(game)}>
                        {game.name} ({game.year})
                    </li>
                {/each}
                <li on:click={() => onGameSelected("custom")}>
                    My game is not in this list
                </li>
            </ul>
        {/if}
    </div>
</div>

<style>
    .add-game-container {
        padding: 1.5rem;
        max-width: 800px;
        margin: 0 auto;
        background: #f9f9f9;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    .step {
        margin-bottom: 2rem;
    }

    label {
        font-weight: bold;
        margin-bottom: 0.5rem;
        display: block;
    }

    input, select, button {
        padding: 0.5rem;
        margin-top: 0.5rem;
        width: 100%;
        box-sizing: border-box;
    }

    .search-results ul {
        list-style: none;
        padding: 0;
        margin: 1rem 0;
    }

    .search-results li {
        padding: 0.5rem;
        border: 1px solid #ddd;
        margin-bottom: 0.5rem;
        cursor: pointer;
    }

    .search-results li:hover {
        background-color: #eee;
    }

    button {
        background: #007bff;
        color: #fff;
        border: none;
        cursor: pointer;
    }

    button:hover {
        background: #0056b3;
    }

    .error {
        color: red;
        font-weight: bold;
        margin-top: 1rem;
    }
</style>
