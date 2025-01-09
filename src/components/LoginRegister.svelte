<script>
    import { user, loggedIn } from "../stores/auth";
    import { login, register } from "../mockApi";
    import { createEventDispatcher } from "svelte";

const dispatch = createEventDispatcher();


    export let username = "";

    let email = "";
    let password = "";
    let loginError = "";
    let registerUsername = "";
    let registerEmail = "";
    let registerPassword = "";
    let registerError = "";

    const logIn = async () => {
    const response = await login(email, password);
    if (response.success) {
        loggedIn.set(true);
        user.set(response.user);  // Set the user details in the store
        loginError = "";
        dispatch('loginSuccess');
    } else {
        loggedIn.set(false);
        loginError = response.error;
    }
};

const registerUser = async () => {
    const response = await register(registerUsername, registerEmail, registerPassword);
    if (response.success) {
        loggedIn.set(true);
        user.set(response.user);  // Ensure that the user store is updated with the new user
        registerError = "";
        // Emit registration success
        dispatch('registerSuccess');
    } else {
        loggedIn.set(false);
        registerError = response.error;
    }
};

</script>

<div class="login-register">
    <h2>Login</h2>
    <form on:submit|preventDefault={logIn}>
        <input type="email" placeholder="Email" bind:value={email} required />
        <input type="password" placeholder="Password" bind:value={password} required />
        <button type="submit">Log In</button>
        {#if loginError}
            <p class="error-message">{loginError}</p>
        {/if}
    </form>

    <h2>Register</h2>
    <form on:submit|preventDefault={registerUser}>
        <input type="text" placeholder="Username" bind:value={registerUsername} required />
        <input type="email" placeholder="Email" bind:value={registerEmail} required />
        <input type="password" placeholder="Password" bind:value={registerPassword} required />
        <button type="submit">Register</button>
        {#if registerError}
            <p class="error-message">{registerError}</p>
        {/if}
    </form>
</div>
