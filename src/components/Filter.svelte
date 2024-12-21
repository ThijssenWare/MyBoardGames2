<!-- 
    File: src/components/Filter.svelte

    Description:
    This component provides filters for board games, such as selecting mode, 
    number of players, categories, language, and game ownership. 
    It uses a dynamic translation system to support multiple languages.
-->

<script>
    import { categoryOptions } from '../data/categoryOptions'; // List of game categories
    import { loggedIn } from '../stores/auth'; // Authentication status store
    import { translations } from '../stores/translations'; // Translations store
    import { selectedLanguage } from '../stores/languages'; // Selected language store
    import { get } from 'svelte/store'; // Helper function to retrieve current values from stores

    // Props: `filters` allows parent components to bind filter values
    export let filters;

    // State to control the visibility of advanced filters
    let showAdvancedFilters = false;

    // Set default filter values
    if (filters.myGamesOnly === undefined) {
        filters.myGamesOnly = get(loggedIn) || false;
    }
    if (filters.householdOnly === undefined) {
        filters.householdOnly = get(loggedIn) || false;
    }
    if (filters.owner === undefined) {
        filters.owner = "Household";
    }
    if (filters.rating === undefined) {
        filters.rating = 5; // Default rating value
    }

    // Function: Translates keys dynamically based on the selected language
    const t = (key) => {
        const lang = get(selectedLanguage).code; // Get current language code
        return get(translations)[lang]?.[key] || key; // Return translated text or fallback to key
    };
</script>

<!-- Main Filters Container -->
<div class="filters-container">
    <!-- Filter Title -->
    <h2 class="filter-title">{t("filterTitle") || "Filters"}</h2>

    <!-- Mode Filter -->
    <div class="filter-group">
        <label>
            {t("mode") || "Mode"}:
            <select bind:value={filters.mode}>
                <option value="All">{t("all") || "All"}</option>
                <option value="Cooperative">{t("cooperative") || "Cooperative"}</option>
                <option value="Competitive">{t("competitive") || "Competitive"}</option>
                <option value="Mix">{t("mix") || "Mix"}</option>
                <option value="Other">{t("other") || "Other"}</option>
            </select>
        </label>
    </div>

    <!-- Number of Players Filter -->
    <div class="filter-group">
        <label>
            {t("numPlayers") || "Number of Players"}:
        </label>
        <input
            type="range"
            min="1"
            max="10"
            step="1"
            bind:value={filters.numPlayers}
            class="slider"
        />
        <span class="slider-value">{filters.numPlayers}{filters.numPlayers === 10 ? '+' : ''}</span>
    </div>

    <!-- Toggle Advanced Filters Button -->
    <button class="toggle-advanced" on:click={() => (showAdvancedFilters = !showAdvancedFilters)}>
        {showAdvancedFilters
            ? t("hideOptions") || "Hide Options"
            : t("moreOptions") || "More options"}
    </button>

    <!-- Advanced Filters Section -->
    {#if showAdvancedFilters}
        <!-- Categories Filter -->
        <div class="filter-group">
            <label>{t("category") || "Categories"}:</label>
            <div class="categories">
                {#each [...categoryOptions].sort((a, b) => a.localeCompare(b)) as category}
                    <div class="category-item">
                        <input
                            type="checkbox"
                            bind:group={filters.categories}
                            value={category}
                        />
                        <span>{category}</span>
                    </div>
                {/each}
            </div>
        </div>

        <!-- Language Filter -->
        <div class="filter-group">
            <label>
                {t("language") || "Language"}:
                <select bind:value={filters.language}>
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
                min="0.5"
                max="5"
                step="0.5"
                bind:value={filters.rating}
                class="slider"
            />
            <span class="slider-value">{filters.rating}+</span>
        </div>

        <!-- Owner Filter (Visible if logged in) -->
        {#if $loggedIn}
        <div class="filter-group checkbox-group">
            <label>
                {t("owner") || "Owner"}:
                <select bind:value={filters.owner}>
                    <option value="All">{t("all") || "All"}</option>
                    <option value="Me">{t("me") || "Me"}</option>
                    <option value="Household">{t("household") || "Household"}</option>
                </select>
            </label>
            <label>
                <input type="checkbox" bind:checked={filters.myGamesOnly} />
                <span>{t("myGames") || "Show My Games"}</span>
            </label>
            <label>
                <input type="checkbox" bind:checked={filters.householdOnly} />
                <span>{t("householdGames") || "Show Household Games"}</span>
            </label>
        </div>
        {/if}
    {/if}
</div>

<!-- Component Styles -->
<style>
    /* General Filters Container */
    .filters-container {
        padding: 1.5rem;
        background-color: #ffffff;
        border-radius: 12px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        margin-bottom: 1rem;
    }

    .filter-title {
        font-size: 1.75rem;
        margin-bottom: 1rem;
        color: #333;
        text-align: center;
    }

    .filter-group {
        margin-bottom: 1.5rem;
    }

    label {
        font-weight: 600;
        color: #444;
        margin-bottom: 0.5rem;
    }

    /* Checkbox alignment */
    .checkbox-group label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
    }

    /* Modern Slider */
    .slider {
        -webkit-appearance: none;
        width: 100%;
        height: 8px;
        background: #e0e0e0;
        border-radius: 5px;
        outline: none;
    }

    .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 18px;
        height: 18px;
        background-color: #007bff;
        border-radius: 50%;
        cursor: pointer;
        border: 2px solid #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .slider-value {
        display: block;
        margin-top: 0.5rem;
        text-align: center;
        font-size: 1rem;
        color: #555;
    }

    /* Categories Grid */
    .categories {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 0.5rem;
    }

    .category-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    /* Advanced Button */
    .toggle-advanced {
        background-color: #007bff;
        color: white;
        padding: 0.5rem 1rem;
        text-align: center;
        border: none;
        border-radius: 6px;
        cursor: pointer;
    }

    .toggle-advanced:hover {
        background-color: #0056b3;
    }
</style>
