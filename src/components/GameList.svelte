<!-- 
    File: src/components/GameList.svelte

    Description:
    This component renders a list of games based on the filtered games and user inputs like search query and sorting preferences.
-->

<!-- 
    File: src/components/GameList.svelte

    Description:
    This component renders a list of games based on the filtered games and user inputs like search query and sorting preferences.
-->

<script>
  import "../styles/GameList_Style.css"; // Import the styles
  import { navigate } from "../stores/routes";
  import { loggedIn } from "../stores/auth";
  import { games } from "../stores/games"; // Import games store
  import { filters } from "../stores/filters"; // Import persistent filters store
  import { translations } from "../stores/translations"; // Import translations store
  import { selectedLanguage } from "../stores/languages"; // Import selectedLanguage store
  import { get } from "svelte/store";

  export let searchQuery = ""; // Search query for filtering games
  export let sortBy = "name"; // Sort field (e.g., "name", "rating")
  export let sortOrder = "asc"; // Sort order ("asc" or "desc")

  let filteredGames = [];

  // Make `t` reactive by deriving it directly from `translations` and `selectedLanguage`.
  $: t = (key) => $translations[$selectedLanguage.code]?.[key] || key;

  /**
   * Reactive filtering logic:
   * This block will recompute whenever any of the following variables change:
   * - $games (games store)
   * - $filters (filters store)
   * - searchQuery, sortBy, or sortOrder
   */
  $: {
    const query = searchQuery.toLowerCase();
    const categoryFilterType = $filters.categories.length
      ? $filters.categoryFilterType
      : "OR"; // Get selected category filter type (OR/AND)

    filteredGames = $games
      .filter((game) => {
        const gameRating = parseFloat(game.personalRating) || 0;
        const minPlayers = parseInt(game.minPlayers) || 0;
        const maxPlayers = parseInt(game.maxPlayers) || Infinity;

        if (!game || !game.name) return false;

        const matchesSearch = game.name.toLowerCase().includes(query);
        const matchesMode = $filters.mode === "All" || game.mode === $filters.mode;
        const matchesNumPlayers =
          $filters.numPlayers === 0 ||
          ($filters.numPlayers >= minPlayers && $filters.numPlayers <= maxPlayers);
        const matchesRating = gameRating >= $filters.rating;

        let matchesCategories = false;
        if ($filters.categories.length > 0) {
          if (categoryFilterType === "OR") {
            matchesCategories = $filters.categories.some((cat) =>
              game.categories?.some(
                (gameCategory) => gameCategory.toLowerCase() === cat.toLowerCase()
              )
            );
          } else if (categoryFilterType === "AND") {
            matchesCategories = $filters.categories.every((cat) =>
              game.categories?.some(
                (gameCategory) => gameCategory.toLowerCase() === cat.toLowerCase()
              )
            );
          }
        } else {
          matchesCategories = true;
        }

        const matchesLanguage =
          $filters.language === "All" || game.language === $filters.language;
        const matchesOwner = $filters.owner === "All" || game.owner === $filters.owner;

        return (
          matchesSearch &&
          matchesMode &&
          matchesNumPlayers &&
          matchesRating &&
          matchesCategories &&
          matchesLanguage &&
          matchesOwner
        );
      })
      .sort((a, b) => {
        const fieldA = (a[sortBy] || "").toString().toLowerCase();
        const fieldB = (b[sortBy] || "").toString().toLowerCase();

        if (sortBy === "rating") {
          const ratingA = parseFloat(a.personalRating) || 0;
          const ratingB = parseFloat(b.personalRating) || 0;
          return sortOrder === "asc" ? ratingA - ratingB : ratingB - ratingA;
        }

        return fieldA < fieldB
          ? sortOrder === "asc"
            ? -1
            : 1
          : fieldA > fieldB
          ? sortOrder === "asc"
            ? 1
            : -1
          : 0;
      });
  }

  const goToDetails = (id) => {
    navigate(`/game-details/${id}`);
  };

  const goToAddGame = () => {
    navigate("/add-game");
  };
</script>

<div class="search-bar">
  <input
    type="text"
    placeholder={t("searchGamesPlaceholder")}
    bind:value={searchQuery}
  />
</div>

<div class="sorting">
  <label>
    {t("sortBy")}:
    <select bind:value={sortBy}>
      <option value="name">{t("name")}</option>
      <option value="rating">{t("rating")}</option>
    </select>
  </label>

  <label>
    {t("order")}:
    <select bind:value={sortOrder}>
      <option value="asc">{t("ascending")}</option>
      <option value="desc">{t("descending")}</option>
    </select>
  </label>

  {#if $loggedIn}
    <button class="add-game-button" on:click={goToAddGame}>
      ➕ {t("addGameButton")}
    </button>
  {/if}
</div>

<div class="games-list">
  {#if filteredGames.length > 0}
    {#each filteredGames as game}
      {#if game}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="game-row" on:click={() => goToDetails(game.id)}>
          <img class="game-thumbnail" src={game.imageUrl} alt={game.name} />
          <div class="game-info">
            <h3>{game.name}</h3>
            <p>{t("rating")}: {game.personalRating}</p>
          </div>
          <button on:click|stopPropagation={() => goToDetails(game.id)}>
            {t("viewDetails")}
          </button>
        </div>
      {/if}
    {/each}
  {:else}
    <p>{t("noGamesFound")}</p>
  {/if}
</div>
