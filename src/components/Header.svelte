<!-- 
Header.svelte

## Folder Structure Expectations:
- src/
  - components/
    - Header.svelte (this file)
  - stores/
    - routes.js
    - auth.js (for global loggedIn state)

## Variables Imported (from parent):
- username: String - the name of the logged-in user.
- householdName: String - household name for the user.

## Dependencies:
- Global login state via 'loggedIn' store in stores/auth.js.
- Manual routing via 'navigate()' function in stores/routes.js.

## Variables Exported:
- None.
-->

<script>
    import "../styles/Header_Style.css"; // Import the styles
    import { navigate } from "../stores/routes";
    import { loggedIn } from "../stores/auth"; 
    import { get } from "svelte/store"; 
    import { languages, selectedLanguage } from "../stores/languages"; // Import global language stores
    import { translations } from "../stores/translations"; // Import translations store

    export let username = "";
    export let householdName = "";

    let isDropdownOpen = false;
    let isLanguageDropdownOpen = false;

    // Function to toggle login state
    const toggleLogin = () => {
      loggedIn.update((value) => !value);
    };

    // Function to log out
    const logOut = () => {
      loggedIn.set(false);
      alert("Logged out!");
    };

    // Function to change the selected language
    const changeLanguage = (language) => {
        selectedLanguage.set(language);  // Set the new language in the store
        isLanguageDropdownOpen = false;  // Close the language dropdown after selection
    };

    // Function to fetch the current translation based on the selected language
    const getTranslation = (key) => {
        const lang = get(selectedLanguage).code;
        const translationsForLang = get(translations)[lang];
        return translationsForLang[key] || key;  // Return translated text or key if not found
    };
</script>

<header class="header">
    <div class="header-left">
        <button
            class:logged-in={$loggedIn}
            class:logged-out={!$loggedIn}
            on:click={toggleLogin}
        >
            {$loggedIn ? getTranslation("logout") : getTranslation("login")}
        </button>
        <nav>
            <!-- svelte-ignore a11y-invalid-attribute -->
            <a href="#" on:click|preventDefault={() => navigate("/")}>{getTranslation("home")}</a>
        </nav>
    </div>

    <div class="header-right">
        {#if $loggedIn}
            <div>
                {getTranslation("welcome", { username, householdName })}
            </div>
        {/if}
        <button
            on:click={() => (isDropdownOpen = !isDropdownOpen)}
            aria-expanded={isDropdownOpen}
            aria-label="Account options dropdown"
        >
            {$loggedIn ? getTranslation("account") : getTranslation("login")}
        </button>
        {#if isDropdownOpen}
            <div class="dropdown" role="menu">
                {#if $loggedIn}
                    <button on:click={logOut}>{getTranslation("logout")}</button>
                {:else}
                    <button on:click={() => loggedIn.set(true)}>{getTranslation("logIn")}</button>
                    <button on:click={() => alert(getTranslation("register"))}>{getTranslation("register")}</button>
                {/if}
            </div>
        {/if}

        <!-- Language Selector (Flag Image) -->
        <button
            on:click={() => (isLanguageDropdownOpen = !isLanguageDropdownOpen)}
            aria-expanded={isLanguageDropdownOpen}
            aria-label="Language options dropdown"
        >
            {#if $selectedLanguage}
                <img src={$selectedLanguage.flag} alt="Selected Language" width="20" height="14" />  <!-- Small flag image -->
                {$selectedLanguage.name}
            {/if}
        </button>

        {#if isLanguageDropdownOpen}
            <div class="language-dropdown" role="menu">
                {#each $languages as language}
                    <button on:click={() => changeLanguage(language)}>
                        <img src={language.flag} alt={language.name} width="20" height="14" /> <!-- Small flag image -->
                        {language.name}
                    </button>
                {/each}
            </div>
        {/if}
    </div>
</header>

