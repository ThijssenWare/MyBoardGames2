<!--
GamePreview.svelte

Description:
This component displays a preview of the new game's details before it is saved. It provides buttons to save the game or cancel the operation, resetting the form.

Dependencies:
- `games` from `src/stores/games.js` (updates the global games store when a new game is added)
- Expects `newGame` to be passed as a prop
- Expects `onResetForm` and `onSaveGame` as callback functions

Inputs:
- `newGame`: An object containing the details of the game being previewed
- `onResetForm`: Callback function triggered when the "Cancel" button is clicked
- `onSaveGame`: Callback function triggered when the "Save" button is clicked

Outputs:
- Adds the new game to the `games` store when saved
- Resets the form by calling `onResetForm`
-->

<script>
    import { games } from "../stores/games";

    export let newGame;
    export let onResetForm; // Callback to reset the form
    export let onSaveGame; // Callback to save the game

    function saveGame() {
        games.push(newGame);
        onResetForm();
        alert("Game added successfully!");
    }
</script>

<div class="preview">
    <h2>Preview</h2>
    <pre>{JSON.stringify(newGame, null, 2)}</pre>
    <button on:click={() => onResetForm()}>Cancel</button>
    <button on:click={() => saveGame()}>Save</button>
</div>
