<!-- 
    File: src/components/Filter.svelte

    Description:
    This component provides filters for board games, such as selecting mode, 
    number of players, categories, language, and game ownership. 
    It uses a dynamic translation system to support multiple languages.
-->
<script>
    import "../styles/Filter_Style.css"; // Import the styles
    import { categoryOptions } from '../data/categoryOptions'; // List of game categories
    import { loggedIn } from '../stores/auth'; // Authentication status store
    import { translations } from '../stores/translations'; // Translations store
    import { selectedLanguage } from '../stores/languages'; // Selected language store
    import { get } from 'svelte/store'; // Helper function to retrieve current values from stores
    import { modeOptions } from '../data/modeOptions'; // Import mode options
    import { filters } from '../stores/filters'; // Import filters store
  
 
    // Local state to control the visibility of advanced filters
    let showAdvancedFilters = false;
  
    // Function: Translates keys dynamically based on the selected language
    const t = (key) => {
      const lang = get(selectedLanguage).code; // Get current language code
      return get(translations)[lang]?.[key] || key; // Return translated text or fallback to key
    };
</script>

<!-- Main Filters Container -->
<div class="filters-container">
  <h2 class="filter-title">{t("filterTitle") || "Filters"}</h2>

  <!-- Mode Filter -->
  <div class="filter-group">
    <label>
      {t("mode") || "Mode"}:
      <select bind:value={$filters.mode}>
        {#each modeOptions as { value, label }}
          <option value={value}>{t(label.toLowerCase()) || label}</option>
        {/each}
      </select>
    </label>
  </div>

  <!-- Number of Players Filter -->
  <div class="filter-group">
    <label>{t("numPlayers") || "Number of Players"}:</label>
    <input
      type="range"
      min="0"
      max="10"
      step="1"
      bind:value={$filters.numPlayers}
      class="slider"
    />
    <span class="slider-value">{$filters.numPlayers}{$filters.numPlayers === 10 ? '+' : ''}</span>
  </div>

  <!-- Toggle Advanced Filters Button -->
  <button class="toggle-advanced" on:click={() => (showAdvancedFilters = !showAdvancedFilters)}>
    {showAdvancedFilters ? t("hideOptions") || "Hide Options" : t("moreOptions") || "More options"}
  </button>

  {#if showAdvancedFilters}
    <!-- Categories Filter -->
    <div class="filter-group">
      <label>{t("category") || "Categories"}:</label>
      <div class="categories">
        {#each [...categoryOptions].sort((a, b) => a.localeCompare(b)) as category}
          <div class="category-item">
            <input type="checkbox" bind:group={$filters.categories} value={category} />
            <span>{category}</span>
          </div>
        {/each}
      </div>
    </div>

    <!-- Language Filter -->
    <div class="filter-group">
      <label>
        {t("language") || "Language"}:
        <select bind:value={$filters.language}>
          <option value="All">{t("all") || "All"}</option>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="German">German</option>
          <option value="Portuguese">Portuguese</option>
          <option value="Dutch">Dutch</option>
        </select>
      </label>
    </div>

    <!-- Rating Slider -->
    <div class="filter-group">
      <label>{t("rating") || "Rating"}:</label>
      <input
        type="range"
        min="0"
        max="10"
        step="0.1"
        bind:value={$filters.rating}
        class="slider"
      />
      <span class="slider-value">{$filters.rating}+</span>
    </div>

    <!-- Owner Filter (Visible if logged in) -->
    {#if $loggedIn}
    <div class="filter-group checkbox-group">
      <label>{t("owner") || "Owner"}:</label>
      <select bind:value={$filters.owner}>
        <option value="All">{t("all") || "All"}</option>
        <option value="Me">{t("me") || "Me"}</option>
        <option value="Household">{t("household") || "Household"}</option>
      </select>

      <label>
        <input type="checkbox" bind:checked={$filters.myGamesOnly} />
        <span>{t("myGames") || "Show My Games"}</span>
      </label>
      <label>
        <input type="checkbox" bind:checked={$filters.householdOnly} />
        <span>{t("householdGames") || "Show Household Games"}</span>
      </label>
    </div>
    {/if}
  {/if}
</div>
