<!-- 
GameDetails.svelte

## Folder Structure:
- src/pages/GameDetails.svelte

## Description:
This component displays detailed information about a specific game.

## Variables Exported:
- None.

## Variables Expected:
- gameId (string): Game ID extracted from the route.
- isLoggedIn: isLogged in from auth.js

## Dependencies:
- `navigate` from `stores/routes.js`: For back navigation.
-->

<!-- src/pages/GameDetails.svelte -->

<!-- src/pages/GameDetails.svelte -->

<script>
    import { navigate } from "../stores/routes";
    import { games } from "../stores/games";
    import { loggedIn } from "../stores/auth";
    import Header from "../components/Header.svelte";
    import { get } from "svelte/store";

    export let gameId;

    // Reactive store values
    let isLoggedIn;
    loggedIn.subscribe(value => isLoggedIn = value);

    // Fetch the games list from the store
    const gamesList = get(games);

    // Find the specific game based on gameId
    let game = gamesList.find((g) => g.id === parseInt(gameId)) || {
        name: "Game Not Found",
        description: "No details available.",
    };

    // State to track edit mode
    let editMode = false;

    // Editable fields
    let editedGame = { ...game };

    const toggleEdit = () => {
        editMode = !editMode;
        if (!editMode) {
            // Save edits back to the global store
            const updatedGames = gamesList.map((g) =>
                g.id === game.id ? editedGame : g
            );
            games.set(updatedGames);
        }
    };

    const goBack = () => navigate("/");
</script>

<Header />

<div class="game-details">
    <button on:click={goBack}>Back</button>
    {#if isLoggedIn}
        <button on:click={toggleEdit}>{editMode ? "Save" : "Edit"}</button>
    {/if}

    <div class="details-container">
        <h1>
            {#if editMode}
                <input type="text" bind:value={editedGame.name} />
            {:else}
                {game.name}
            {/if}
        </h1>

        <img src={game.imageurl} alt={game.name} class="game-image" />

        <ul>
            <!-- Language -->
            <li>
                <strong>Language:</strong>
                {#if editMode}
                    <input type="text" bind:value={editedGame.language} />
                {:else}
                    {game.language}
                {/if}
            </li>

            <!-- Rating (Visible only when logged in) -->
            {#if isLoggedIn}
                <li>
                    <strong>Rating:</strong>
                    {#if editMode}
                        <input type="number" bind:value={editedGame.rating} step="0.1" min="0" max="10" />
                    {:else}
                        {game.rating}
                    {/if}
                </li>
            {/if}

            <!-- Last Played (Visible only when logged in) -->
            {#if isLoggedIn}
                <li>
                    <strong>Last Played:</strong>
                    {#if editMode}
                        <input type="date" bind:value={editedGame.lastplayed} />
                    {:else}
                        {game.lastplayed}
                    {/if}
                </li>
            {/if}

            <!-- Min Players -->
            <li>
                <strong>Min Players:</strong>
                {#if editMode}
                    <input type="number" bind:value={editedGame.minplayers} />
                {:else}
                    {game.minplayers}
                {/if}
            </li>

            <!-- Max Players -->
            <li>
                <strong>Max Players:</strong>
                {#if editMode}
                    <input type="number" bind:value={editedGame.maxplayers} />
                {:else}
                    {game.maxplayers}
                {/if}
            </li>

            <!-- Tag -->
            <li>
                <strong>Tag:</strong>
                {#if editMode}
                    <input type="text" bind:value={editedGame.tag} />
                {:else}
                    {game.tag}
                {/if}
            </li>

            <!-- Category -->
            <li>
                <strong>Category:</strong>
                {#if editMode}
                    <input type="text" bind:value={editedGame.category} />
                {:else}
                    {game.category.join(", ")}
                {/if}
            </li>

            <!-- Owner (Visible only when logged in) -->
            {#if isLoggedIn}
                <li>
                    <strong>Owner(s):</strong>
                    {#if editMode}
                        <input type="text" bind:value={editedGame.owner} />
                    {:else}
                        {game.owner.join(", ")}
                    {/if}
                </li>
            {/if}

            <!-- BoardGameGeek Link -->
            <li>
                <a href={game.bggurl} target="_blank">View on BoardGameGeek</a>
            </li>
        </ul>
    </div>
</div>

<style>
    .game-details {
        padding: 20px;
        text-align: center;
    }

    .game-image {
        max-width: 300px;
        margin: 20px auto;
        border: 1px solid #ccc;
        border-radius: 10px;
    }

    .details-container {
        margin: 0 auto;
        text-align: left;
        max-width: 500px;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    li {
        margin: 10px 0;
    }

    a {
        color: blue;
        text-decoration: underline;
    }

    button {
        background-color: turquoise;
        border: none;
        color: white;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        margin: 5px;
    }

    button:hover {
        background-color: #40e0d0;
    }

    input {
        padding: 5px;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
</style>
