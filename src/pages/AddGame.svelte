<script>
  import "../styles/AddGame_Style.css"; // Import the styles
  import Header from "../components/Header.svelte";
  import { games } from "../stores/games.js";
  import GameSearch from "../components/GameSearch.svelte";
  import GameDetails from "../components/GameDetails.svelte";
  import GamePreview from "../components/GamePreview.svelte";

  let step = 1;
  let newGame = {};
  let selectedFromBGG = false;
  let showConfirmation = false; // State for showing confirmation popup

  const resetForm = () => {
    newGame = {};
    selectedFromBGG = false;
    step = 1;
    console.log("Form reset:", newGame);
  };

  const saveGame = () => {
    console.log("Saving game:", newGame);
    games.update((current) => {
      console.log("Current games before update:", current);
      const updatedGames = [...current, { ...newGame, id: Date.now().toString() }];
      console.log("Updated games:", updatedGames);
      return updatedGames;
    });
    showConfirmation = true; // Show confirmation popup
    setTimeout(() => (showConfirmation = false), 2000); // Hide popup after 2 seconds
    resetForm();
  };

  $: console.log("Current step:", step);
  $: console.log("Current game data:", newGame);
</script>

<Header /> <!-- Ensure Header is at the top -->
<div class="add-game-container">
  <h1>Add a New Game</h1>
  {#if step === 1}
    <GameSearch bind:newGame bind:step bind:selectedFromBGG />
  {:else if step === 2}
    <GameDetails bind:newGame bind:step {selectedFromBGG} />
  {:else if step === 3}
    <GamePreview
      bind:newGame
      {resetForm}
      on:saveGame={saveGame} />
  {/if}
</div>

<!-- Popup Confirmation -->
{#if showConfirmation}
  <div class="confirmation-popup">
    Game successfully added!
  </div>
{/if}

