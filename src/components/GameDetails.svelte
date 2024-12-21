<!--
GameDetails.svelte

Description:
This component allows the user to input or edit the details of the selected game. It dynamically binds the input fields to the `newGame` object, which stores all game details.

Dependencies:
- `categories` from `src/stores/categories.js` (provides the list of categories for games)
- `languages` from `src/stores/languages.js` (provides the list of languages for selection)
- Expects `newGame` to be passed as a prop
- Expects `onPreviewGame` as a callback function to trigger the preview

Inputs:
- `newGame`: An object representing the game being added or edited
- `onPreviewGame`: Callback function triggered when the user clicks "Next" to proceed to preview

Outputs:
- Updates the `newGame` object dynamically as the user fills out the form
- Triggers `onPreviewGame` when the "Next" button is clicked
-->

<script>
    import { categories } from "../stores/categories";
    import { languages } from "../stores/languages";

    export let newGame;
    export let onPreviewGame; // Callback to trigger preview
</script>

<div class="step">
    <h2>Enter Game Details</h2>
    <div class="field">
        <label>Name:</label>
        <input type="text" bind:value={newGame.name} required />
    </div>
    <div class="field">
        <label>Language:</label>
        <select bind:value={newGame.language}>
            {#each $languages as lang}
                <option value={lang.code}>{lang.name}</option>
            {/each}
        </select>
    </div>
    <div class="field">
        <label>Personal Rating:</label>
        <input type="number" bind:value={newGame.personalRating} min="0" max="10" step="0.5" />
    </div>
    <div class="field">
        <label>Last Played:</label>
        <input type="date" bind:value={newGame.lastPlayed} />
    </div>
    <div class="field">
        <label>Categories:</label>
        <div>
            {#each $categories as category}
                <label>
                    <input type="checkbox" bind:group={newGame.categories} value={category} />
                    {category}
                </label>
            {/each}
        </div>
    </div>
    <button on:click={() => onPreviewGame()}>Next</button>
</div>
