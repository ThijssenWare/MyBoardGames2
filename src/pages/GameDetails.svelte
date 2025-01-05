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
  
    export let gameId; // Game ID passed as prop
  
    // Reactive store values
    let isLoggedIn;
    loggedIn.subscribe((value) => (isLoggedIn = value));
  
    // Find the game from the store
    let game;
    let gamesList = get(games);
  
    // Reactive updates for game when gameId changes
    $: {
      game = gamesList.find((g) => g.id === parseInt(gameId)) || {
        name: "Game Not Found",
        description: "No details available.",
      };
    }
  
    // Edit Mode State
    let editMode = false;
  
    // Editable fields
    let editedGame = { ...game };
  
    const toggleEdit = () => {
      editMode = !editMode;
      if (!editMode && game.name !== "Game Not Found") {
        // Save edits back to the store
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
  
    {#if game.name !== "Game Not Found"}
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
  
        <img src={game.imageUrl || "/default-image.png"} alt={game.name} class="game-image" />
  
        <ul>
          <li><strong>Language:</strong> {game.language || "Unknown"}</li>
          <li><strong>Min Players:</strong> {game.minPlayers || "N/A"}</li>
          <li><strong>Max Players:</strong> {game.maxPlayers || "N/A"}</li>
          <li><strong>Description:</strong> {game.description || "No description provided."}</li>
          {#if game.bggUrl}
            <li><a href={game.bggUrl} target="_blank">View on BoardGameGeek</a></li>
          {/if}
        </ul>
      </div>
    {:else}
      <div class="not-found">
        <h1>404: Game Not Found</h1>
        <button on:click={goBack}>Go Back Home</button>
      </div>
    {/if}
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
