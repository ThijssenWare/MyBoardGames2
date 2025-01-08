<!--
AddGame_GameDetails.svelte

Description:
This component allows the user to input or edit the details of the selected game.
It dynamically binds the input fields to the `newGame` object, which stores all game details.
-->

<script>
  import { categories } from "../stores/categories";
  import { languages } from "../stores/languages";
  import { modeOptions } from "../data/modeOptions"; // Import mode options

  export let newGame;
  export let step;
  export let selectedFromBGG;

  const proceedToPreview = () => {
      if (!newGame.name || !newGame.minPlayers || !newGame.maxPlayers || !newGame.mode) {
          alert("Please fill out all required fields.");
          return;
      }

      step = 3;
  };
</script>

<div class="step">
  <h2>Enter Game Details</h2>
  <div class="field">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label>Language:</label>
      <select bind:value={newGame.language}>
          {#each $languages as lang}
              <option value={lang.code}>{lang.name}</option>
          {/each}
      </select>
  </div>
  <div class="field">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label>Personal Rating:</label>
      <input
          type="number"
          bind:value={newGame.personalRating}
          min="0"
          max="10"
          step="0.5"
      />
  </div>
  <div class="field">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label>Last Played:</label>
      <input type="date" bind:value={newGame.lastPlayed} />
  </div>
  <div class="field">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label>Categories:</label>
      {#each $categories as category}
          <label>
              <input
                  type="checkbox"
                  bind:group={newGame.categories}
                  value={category}
              />
              {category}
          </label>
      {/each}
  </div>

  {#if !selectedFromBGG}
      <div class="field">
          <label for="name">Game Name:</label>
          <input id="name" type="text" bind:value={newGame.name} />
      </div>
      <div class="field">
          <label for="minPlayers">Min Players:</label>
          <input id="minPlayers" type="number" bind:value={newGame.minPlayers} />
      </div>
      <div class="field">
          <label for="maxPlayers">Max Players:</label>
          <input id="maxPlayers" type="number" bind:value={newGame.maxPlayers} />
      </div>
      <div class="field">
          <label for="bestWithXPlayers">Best With X Players:</label>
          <input
              id="bestWithXPlayers"
              type="text"
              bind:value={newGame.bestWithXPlayers}
          />
      </div>
  {/if}

  <!-- Mode dropdown (always required) -->
  <div class="field">
      <label for="mode">Mode:</label>
      <select id="mode" bind:value={newGame.mode} required>
          <option value="" disabled selected>Select a mode</option>
          {#each modeOptions as { value, label }}
              <option value={value}>{label}</option>
          {/each}
      </select>
  </div>

  <button on:click={proceedToPreview}>Next</button>
</div>
