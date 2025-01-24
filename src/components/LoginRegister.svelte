<script>
    import { user, loggedIn } from "../stores/auth";
    import api from "../utils/mock_Auth_API"; // Centralized API
    import { translations } from "../stores/translations";
    import { selectedLanguage } from "../stores/languages";
    import { createEventDispatcher } from "svelte";
    import { get } from "svelte/store";
  
    const dispatch = createEventDispatcher();
  
    let email = "";
    let password = "";
    let loginError = "";
    let registerUsername = "";
    let registerEmail = "";
    let registerPassword = "";
    let registerError = "";
  
    let currentLang = get(selectedLanguage).code;
  
    // Reactive translation function
    const t = (key) => get(translations)[currentLang]?.[key] || key;
  
    // Subscribe to language changes
    $: currentLang = get(selectedLanguage).code;
  
    const logIn = async () => {
      const response = await api.auth.login(email, password); // Centralized API call
      if (response.success) {
        loggedIn.set(true);
        user.set(response.user);
        loginError = "";
        dispatch("loginSuccess");
      } else {
        loggedIn.set(false);
        loginError = response.error;
      }
    };
  
    const registerUser = async () => {
      const response = await api.auth.register(registerUsername, registerEmail, registerPassword); // Centralized API call
      if (response.success) {
        loggedIn.set(true);
        user.set(response.user);
        registerError = "";
        dispatch("registerSuccess");
      } else {
        loggedIn.set(false);
        registerError = response.error;
      }
    };
  </script>
  
  <div class="login-register">
    <h2>{t("logIn")}</h2>
    <form on:submit|preventDefault={logIn}>
      <input type="email" placeholder={t("email")} bind:value={email} required />
      <input type="password" placeholder={t("password")} bind:value={password} required />
      <button type="submit">{t("logIn")}</button>
      {#if loginError}
        <p class="error-message">{loginError}</p>
      {/if}
    </form>
  
    <h2>{t("register")}</h2>
    <form on:submit|preventDefault={registerUser}>
      <input type="text" placeholder={t("name")} bind:value={registerUsername} required />
      <input type="email" placeholder={t("email")} bind:value={registerEmail} required />
      <input type="password" placeholder={t("password")} bind:value={registerPassword} required />
      <button type="submit">{t("register")}</button>
      {#if registerError}
        <p class="error-message">{registerError}</p>
      {/if}
    </form>
  </div>
  