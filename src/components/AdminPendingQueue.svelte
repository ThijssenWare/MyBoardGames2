<script>
    import { pendingGames, approveGame, denyGame } from "../stores/pendingGames";

    let games;

    $: pendingGames.subscribe((value) => {
        games = value;
    });

    const handleApproval = (gameId) => {
        approveGame(gameId);
    };

    const handleDenial = (gameId) => {
        denyGame(gameId);
    };
</script>

<div>
    <h2>Pending Games for Approval</h2>
    {#if games.length === 0}
        <p>No pending games.</p>
    {:else}
        <ul>
            {#each games as game (game.id)}
                <li>
                    <strong>{game.name}</strong> - Submitted by: {game.submittedBy}
                    <button on:click={() => handleApproval(game.id)}>Approve</button>
                    <button on:click={() => handleDenial(game.id)}>Deny</button>
                </li>
            {/each}
        </ul>
    {/if}
</div>
