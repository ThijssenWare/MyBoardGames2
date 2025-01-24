<script>
  import "../styles/AddGame_Style.css"; // Import the styles
  import Header from "../components/Header.svelte";
  import { addGame } from "../stores/games.js"; // Import the addGame function
  import GameSearch from "../components/AddGame_GameSearch.svelte";
  import GameDetails from "../components/AddGame_GameDetails.svelte";
  import GamePreview from "../components/AddGame_GamePreview.svelte";

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

  const saveGame = async () => {
    try {
      console.log("Saving game:", newGame);
      await addGame(newGame); // Use the store's addGame function
      showConfirmation = true; // Show confirmation popup
      setTimeout(() => (showConfirmation = false), 2000); // Hide popup after 2 seconds
      resetForm();
    } catch (error) {
      console.error("Failed to save game:", error);
    }
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

<!-- Credit Image for BGG -->
<div class="bgg-credit">
  <img src="/assets/PowerBGG.jpeg" alt="Powered by BGG" />
</div>

