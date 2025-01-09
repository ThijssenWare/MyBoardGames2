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
  let gamesList = get(games);  // Get the list of games

  // Reactive updates for game when gameId changes
  $: {
    if (gameId) {
      // Convert gameId to a string for comparison
      game = gamesList.find((g) => g.id === gameId) || {
        name: "Game Not Found",
        description: "No details available.",
      };
    }
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
  <button class="back-button" on:click={goBack}>Back</button>

  {#if game.name !== "Game Not Found"}
    {#if isLoggedIn}
      <button class="edit-button" on:click={toggleEdit}>{editMode ? "Save" : "Edit"}</button>
    {/if}

    <div class="details-card">
      <div class="game-header">
        <h1>
          {#if editMode}
            <input type="text" bind:value={editedGame.name} class="game-name-input" />
          {:else}
            {game.name}
          {/if}
        </h1>
        <img src={game.imageUrl || "/default-image.png"} alt={game.name} class="game-image" />
      </div>
      
      <div class="game-info">
        <ul>
          <li><strong>Language:</strong> {game.language || "Unknown"}</li>
          <li><strong>Personal Rating:</strong> {game.personalRating || "N/A"}</li>
          <li><strong>Last Played:</strong> {game.lastPlayed || "N/A"}</li>
          <li><strong>Min Players:</strong> {game.minPlayers || "N/A"}</li>
          <li><strong>Max Players:</strong> {game.maxPlayers || "N/A"}</li>
          <li><strong>Play Time:</strong> {game.minPlaytime || "N/A"} - {game.maxPlaytime || "N/A"} minutes</li>
          <li><strong>Description:</strong> {game.description || "No description provided."}</li>
          <li><strong>Mode:</strong> {game.mode || "No mode provided."}</li>
          <li><strong>Categories:</strong> {game.categories || "No categories provided."}</li>
          {#if game.bggUrl}
            <li><a href={game.bggUrl} target="_blank">View on BoardGameGeek</a></li>
          {/if}
        </ul>
      </div>
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
  max-width: 800px;
  margin: 0 auto;
}

.back-button,
.edit-button {
  background-color: #008cba;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
  font-size: 1rem;
}

.back-button:hover,
.edit-button:hover {
  background-color: #0077a3;
}

.details-card {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: left;
  max-width: 600px;
  margin: 0 auto;
}

.game-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.game-name-input {
  font-size: 1.25rem;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 10px;
}

.game-image {
  max-width: 300px;
  border-radius: 10px;
  margin-top: 10px;
}

.game-info ul {
  list-style: none;
  padding: 0;
}

.game-info li {
  font-size: 1rem;
  margin-bottom: 10px;
}

.game-info li a {
  color: #0077b3;
  text-decoration: underline;
}

.not-found {
  text-align: center;
}

.not-found h1 {
  color: #e74c3c;
  font-size: 2rem;
}

button {
  background-color: #40e0d0;
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
</style>

