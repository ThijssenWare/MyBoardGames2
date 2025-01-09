<script>
    import "../styles/Header_Style.css";
    import { navigate } from "../stores/routes";
    import { user, loggedIn } from "../stores/auth";
    import { filters } from '../stores/filters';
    import { get } from "svelte/store";
    import { languages, selectedLanguage } from "../stores/languages";
    import { translations } from "../stores/translations";
    import LoginRegister from "./LoginRegister.svelte";
    import { defaultFilters } from '../data/filter_DefaultValues'; // Import the default filter values
    
    export let username = "";
    export let householdName = "";

    let isDropdownOpen = false; // For account options
    let isLanguageDropdownOpen = false; // For language selector
    let isLoginModalOpen = false; // For login/register modal
    let showRegisterForm = false; // Toggle between login and register forms
    let successMessage = ""; // Registration success message

    const logOut = () => {
        loggedIn.set(false);
        user.set(null); // Clear user data when logging out
        filters.set(defaultFilters); // Reset filters to default values
        householdName = ""; // Clear householdName
    };

    const changeLanguage = (language) => {
        selectedLanguage.set(language);
        isLanguageDropdownOpen = false;
    };

    const getTranslation = (key) => {
        const lang = get(selectedLanguage).code;
        const translationsForLang = get(translations)[lang];
        return translationsForLang[key] || key;
    };

    const handleLoginSuccess = () => {
        isLoginModalOpen = false; // Close modal on login success
    };

    const handleRegisterSuccess = () => {
        successMessage = getTranslation("registration_successful");
        setTimeout(() => {
            successMessage = "";
            isLoginModalOpen = false; // Close modal after registration success
            showRegisterForm = false; // Ensure we reset to the login form
        }, 2000);
    };
</script>

<header class="header">
    <!-- Left Section -->
    <div class="header-left">
        <nav>
            <a href="#" on:click|preventDefault={() => navigate("/")}>{getTranslation("home")}</a>
            <a href="#" on:click|preventDefault={() => navigate("/about")}>{getTranslation("about")}</a>
            <a href="#" on:click|preventDefault={() => navigate("/contact")}>{getTranslation("contact")}</a>
        </nav>
    </div>

    <!-- Right Section -->
    <div class="header-right">
        <!-- Language Selector -->
        <div class="language-selector">
            <button
                on:click={() => (isLanguageDropdownOpen = !isLanguageDropdownOpen)}
                aria-expanded={isLanguageDropdownOpen}
                aria-label="Language options dropdown"
            >
                {#if $selectedLanguage}
                    <img src={$selectedLanguage.flag} alt="Selected Language" width="20" height="14" />
                    <span class="language-name">{$selectedLanguage.name}</span>
                    <span class="arrow-down">▼</span>
                {/if}
            </button>
            {#if isLanguageDropdownOpen}
                <div class="language-dropdown" role="menu">
                    {#each $languages as language}
                        <button on:click={() => changeLanguage(language)}>
                            <img src={language.flag} alt={language.name} width="20" height="14" />
                            <span>{language.name}</span>
                        </button>
                    {/each}
                </div>
            {/if}
        </div>

<!-- Account/Login Button -->
<div class="account-section">
    {#if $loggedIn && $user} <!-- Check that user is not null -->
        <div>
            <span class="welcome-message">
                {getTranslation("welcome")}, {$user.username} {#if $user.householdName}from {$user.householdName}{/if}
            </span>
            <button on:click={logOut} class="logout-button">{getTranslation("logout")}</button>
        </div>
    {:else}
        <button on:click={() => (isLoginModalOpen = true)} aria-expanded={isLoginModalOpen} aria-label="Login/Register modal">
            {getTranslation("login")}
        </button>
    {/if}
</div>



    <!-- Login/Register Modal -->
    {#if isLoginModalOpen}
        <div class="modal-overlay" on:click={() => (isLoginModalOpen = false)}>
            <div class="login-modal" on:click|stopPropagation>
                <button class="close-button" on:click={() => (isLoginModalOpen = false)}>✕</button>
                {#if successMessage}
                    <p class="success-message">{successMessage}</p>
                {/if}
                <LoginRegister
                    bind:username={username}
                    showRegisterForm={showRegisterForm}
                    on:loginSuccess={handleLoginSuccess}
                    on:registerSuccess={handleRegisterSuccess}
                    on:toggleForm={() => (showRegisterForm = !showRegisterForm)}
                />
            </div>
        </div>
    {/if}
</header>
