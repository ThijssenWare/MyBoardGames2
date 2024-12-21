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
    export let newGame;
    export let resetForm;
    export let onSaveGame;
  
    const editDetails = () => {
      newGame.editMode = true;
    };
  </script>
  
  <div class="preview">
    <h2>Preview</h2>
    <pre>{JSON.stringify(newGame, null, 2)}</pre>
    <button on:click={resetForm}>Cancel</button>
    <button on:click={editDetails}>Edit</button>
    <button on:click={onSaveGame}>Save</button>
  </div>
  