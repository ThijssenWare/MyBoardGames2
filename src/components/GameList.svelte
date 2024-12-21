<!-- 
GameList.svelte

## Folder Structure:
- src/components/GameList.svelte

## Description:
This component renders a list of games based on the filtered games and user inputs like search query and sorting preferences.

## Variables Exported:
- None.

## Variables Expected:
- searchQuery (string): Search input to filter games.
- sortBy (string): Field used for sorting the games.
- sortOrder (string): Order for sorting ("asc" or "desc").

## Dependencies:
- `navigate` from `stores/routes`: For navigation between pages.
- `loggedIn` from `stores/auth`: Global store to check logged-in status.
- `games` from `stores/games`: Global store holding the list of games.

-->

<script>
    import { navigate } from "../stores/routes";
    import { loggedIn } from "../stores/auth"; // Importing the global loggedIn store
    import { games } from "../stores/games"; // Import the global games store
    import { get } from "svelte/store";

    // Fetch the games list from the store
    let gamesList = get(games); //should be dynamic: $: gamesList = $games; --> but then everything breaks 

    // Variables passed from the parent
    export let searchQuery = "";
    export let sortBy = "name";
    export let sortOrder = "asc";

    // Function to handle filtering and sorting of games
    let filteredGames = [];

    const filterAndSortGames = () => {
        filteredGames = gamesList
            .filter((game) =>
                game.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .sort((a, b) => {
                const fieldA = a[sortBy];
                const fieldB = b[sortBy];
                if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
                if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
                return 0;
            });
    };

    // Reactively run filter and sort when inputs change
    $: filterAndSortGames();

    // Function to navigate to GameDetails
    const goToDetails = (id) => {
        navigate(`/game-details/${id}`);
    };

    // Function to navigate to the "Add Game" page
    const goToAddGame = () => {
        navigate("/add-game");
    };
</script>

<!-- Search Bar -->
<div class="search-bar">
    <input
        type="text"
        placeholder="Search games..."
        bind:value={searchQuery}
    />
</div>

<!-- Sorting Options with Add Game Button -->
<div class="sorting">
    <label>
        Sort By:
        <select bind:value={sortBy}>
            <option value="name">Name</option>
            <option value="rating">Rating</option>
        </select>
    </label>

    <label>
        Order:
        <select bind:value={sortOrder}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
        </select>
    </label>

    {#if $loggedIn}
        <!-- Add Game Button -->
        <button
            class="add-game-button"
            title="Add Game"
            on:click={goToAddGame}
            aria-label="Add a new game"
        >
            ➕
        </button>
    {/if}
</div>

<!-- Game List -->
<div class="games-list">
    {#each filteredGames as game}
        <!-- Game Card -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
            class="game-item"
            on:click={() => goToDetails(game.id)}
            tabindex="0"
            role="button"
            aria-label={`View details for ${game.name}`}
        >
            <img src={game.imageurl} alt={game.name} />
            <div class="game-info">
                <h3>{game.name}</h3>
                <p>Rating: {game.rating}</p>
            </div>
            <!-- View Details Button -->
            <button
                class="view-details"
                on:click|stopPropagation={() => goToDetails(game.id)}
            >
                View Details
            </button>
        </div>
    {:else}
        <p>No games found matching your search.</p>
    {/each}
</div>

<!-- Styles -->
<style>
    .search-bar {
        margin-bottom: 1rem;
    }

    .search-bar input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .sorting {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
        align-items: center;
        position: relative;
    }

    .sorting select {
        padding: 0.5rem;
        border-radius: 5px;
    }

    .add-game-button {
        margin-left: auto;
        padding: 0.5rem;
        background-color: #ffd700;
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        transition: background-color 0.2s ease;
    }

    .add-game-button:hover {
        background-color: #ffcc00;
    }

    .games-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .game-item {
        display: flex;
        align-items: center;
        background-color: #fffdf0;
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 1rem;
        cursor: pointer;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .game-item:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }

    .game-item img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        margin-right: 1rem;
    }

    .game-info {
        flex-grow: 1;
    }

    h3 {
        margin: 0;
        color: turquoise;
    }

    p {
        margin: 0.5rem 0;
        color: darkgray;
    }

    .view-details {
        padding: 0.5rem;
        background-color: #ffd700;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        width: 120px;
        text-align: center;
    }

    .view-details:hover {
        background-color: #ffcc00;
    }
</style>
