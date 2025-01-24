<script>
    import "../styles/Header_Style.css";
    import { navigate } from "../stores/routes";
    import { user, loggedIn } from "../stores/auth";
    import { filters } from "../stores/filters";
    import { get } from "svelte/store";
    import { languages, selectedLanguage } from "../stores/languages";
    import { translations } from "../stores/translations";
    import LoginRegister from "./LoginRegister.svelte";
    import { defaultFilters } from "../data/filter_DefaultValues";
  
    export let username = "";
    export let householdName = "";
  
    let isDropdownOpen = false;
    let isLanguageDropdownOpen = false;
    let isLoginModalOpen = false;
    let showRegisterForm = false;
    let successMessage = "";
  
    const logOut = () => {
      loggedIn.set(false);
      user.set(null);
      filters.set(defaultFilters);
      householdName = "";
    };
  
    const changeLanguage = (language) => {
      selectedLanguage.set(language);
      isLanguageDropdownOpen = false;
    };
  
    // Dynamically get translations based on the selected language
    $: getTranslation = (key) => {
    const lang = $selectedLanguage.code;
    const translationsForLang = $translations[lang];
    return translationsForLang[key] || key;
};

  
    const handleLoginSuccess = () => {
      isLoginModalOpen = false;
    };
  
    const handleRegisterSuccess = () => {
      successMessage = getTranslation("registration_successful");
      setTimeout(() => {
        successMessage = "";
        isLoginModalOpen = false;
        showRegisterForm = false;
      }, 2000);
    };
  </script>
  
  <header class="header">
    <div class="header-left">
      <nav>
        <a href="#" on:click|preventDefault={() => navigate("/")}>{getTranslation("home")}</a>
        <a href="#" on:click|preventDefault={() => navigate("/about")}>{getTranslation("about")}</a>
        <a href="#" on:click|preventDefault={() => navigate("/contact")}>{getTranslation("contact")}</a>
      </nav>
    </div>
  
    <div class="header-right">
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
  
      <div class="account-section">
        {#if $loggedIn && $user}
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
    </div>
  </header>
  