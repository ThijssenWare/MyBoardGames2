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
    import GameSearch from "../components/GameSearch.svelte";
    import GameDetails from "../components/GameDetails.svelte";
    import GamePreview from "../components/GamePreview.svelte";

    let gameName = "";
    let searchResults = [];
    let selectedGame = null;
    let newGame = {
        id: "",
        name: "",
        language: "",
        personalRating: "",
        lastPlayed: "",
        minPlayers: "",
        maxPlayers: "",
        bggUrl: "",
        imageUrl: "",
        tag: "",
        description: "",
        dutchDescription: "",
        categories: [],
        designer: "",
        artist: "",
        publisher: "",
        expansions: [],
        minPlaytime: "",
        maxPlaytime: "",
        averagePlaytime: "",
        bestWithXPlayers: "",
        categoryDescription: ""
    };
    let showPreview = false;

    function handleGameSelected(game) {
        selectedGame = game;
        if (game === "custom") {
            newGame = { ...newGame };
        }
    }

    function previewGame() {
        showPreview = true;
    }

    function resetForm() {
        gameName = "";
        searchResults = [];
        selectedGame = null;
        newGame = { ...newGame };
        showPreview = false;
    }
</script>

<Header />
<div class="add-game-container">
    <h1>Add a New Game</h1>
    {#if !showPreview}
        {#if !selectedGame}
            <GameSearch {gameName} {searchResults} onGameSelected={handleGameSelected} />
        {:else}
            <GameDetails {newGame} onPreviewGame={previewGame} />
        {/if}
    {:else}
        <GamePreview {newGame} onResetForm={resetForm} />
    {/if}
</div>
