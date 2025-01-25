<!-- 
    File: src/components/Filter.svelte

    Description:
    This component provides filters for board games, including selecting mode, 
    number of players, categories, language, and game ownership. It uses a 
    dynamic translation system to support multiple languages.
-->
<script>
    import "../styles/Filter_Style.css"; // Import styles
    import { categoryOptions } from '../data/categoryOptions'; // List of game categories
    import { loggedIn } from '../stores/auth'; // Authentication status store
    import { translations } from '../stores/translations'; // Translations store
    import { selectedLanguage } from '../stores/languages'; // Selected language store
    import { get } from 'svelte/store'; // Helper to retrieve store values
    import { modeOptions } from '../data/modeOptions'; // Import mode options
    import { filters } from '../stores/filters'; // Filters store
    import { defaultFilters } from '../data/filter_DefaultValues'; // Default filter structure

    // Control visibility of advanced filters
    let showAdvancedFilters = false;

    // Translate keys dynamically based on the selected language
    $: t = (key) => {
    const lang = $selectedLanguage.code; // Current language code
    return $translations[lang]?.[key] || key; // Fallback to key if no translation
};


    // Reactive declaration to check if the reset button should be enabled
    let resetButtonEnabled = false;
    $: resetButtonEnabled = 
        $filters.mode !== defaultFilters.mode ||
        $filters.numPlayers !== defaultFilters.numPlayers ||
        $filters.rating !== defaultFilters.rating ||
        $filters.language !== defaultFilters.language ||
        $filters.owner !== defaultFilters.owner ||
        $filters.categories.length !== defaultFilters.categories.length ||
        $filters.categories.some((category, index) => category !== defaultFilters.categories[index]) ||
        $filters.myGamesOnly !== defaultFilters.myGamesOnly ||
        $filters.householdOnly !== defaultFilters.householdOnly ||
        $filters.categoryFilterType !== defaultFilters.categoryFilterType;

    // Reset all filters to default values
    const resetFilters = () => {
        filters.set({ ...defaultFilters });
    };

    // Select all categories
    const selectAllCategories = () => {
        filters.update(($filters) => ({
            ...$filters,
            categories: [...categoryOptions],
        }));
    };

    // Remove all categories
    const removeAllCategories = () => {
        filters.update(($filters) => ({
            ...$filters,
            categories: [],
        }));
    };

    // Update category filter type (AND/OR)
    const handleCategoryFilterTypeChange = (event) => {
        filters.update(($filters) => ({
            ...$filters,
            categoryFilterType: event.target.value,
        }));
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
        <!-- svelte-ignore a11y-label-has-associated-control -->
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
    <div class="button-group">
        <button 
            class="toggle-advanced" 
            on:click={() => (showAdvancedFilters = !showAdvancedFilters)}>
            {showAdvancedFilters ? t("hideOptions") || "Hide Options" : t("moreOptions") || "More options"}
        </button>

        <!-- Reset Filters Button -->
        <button 
            class="reset-filters" 
            on:click={resetFilters} 
            disabled={!resetButtonEnabled}
            class:disabled={!resetButtonEnabled}>
            {t("resetAllOptions") || "Reset All Options"}
        </button>
    </div>

    {#if showAdvancedFilters}
        <!-- Categories Filter -->
        <div class="filter-group category-filter">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label>{t("category") || "Categories"}:</label>
            <div class="filter-by-options">
                <span>{t("filterByUsing") || "Filter by using:"}</span>
                <select bind:value={$filters.categoryFilterType} on:change={handleCategoryFilterTypeChange}>
                    <option value="OR">{t("or") || "OR"}</option>
                    <option value="AND">{t("and") || "AND"}</option>
                </select>
            </div>
            <div class="categories">
                {#each categoryOptions.sort((a, b) => a.localeCompare(b)) as category}
                    <div class="category-item">
                        <input type="checkbox" bind:group={$filters.categories} value={category} />
                        <span>{category}</span>
                    </div>
                {/each}
            </div>
            <!-- Select All / Remove All Buttons -->
            <div class="category-actions">
                <button on:click={selectAllCategories}>{t("selectAll") || "Select All"}</button>
                <button on:click={removeAllCategories}>{t("removeAll") || "Remove All"}</button>
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
            <!-- svelte-ignore a11y-label-has-associated-control -->
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
                <!-- svelte-ignore a11y-label-has-associated-control -->
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



