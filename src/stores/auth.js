// src/stores/auth.js

/** 
 * auth.js

## Folder Structure:
- src/stores/auth.js

## Description:
This file defines a Svelte store to manage the global authentication state (logged-in status).

## Variables Exported:
- `loggedIn` (writable store): A boolean value representing whether a user is logged in.

## Variables Expected:
- None.

## Dependencies:
- `writable` from `svelte/store`: Provides a reactive store.

 */


// In stores/auth.js
import { writable } from 'svelte/store';

// Load user data from localStorage if available (THIS IS NOT SAFE, CHANGE LATER!)
const storedUser = localStorage.getItem('user');
const storedLoggedIn = localStorage.getItem('loggedIn') === 'true';

export const user = writable(storedUser ? JSON.parse(storedUser) : null);
export const loggedIn = writable(storedLoggedIn);

// Watch for changes and store them in localStorage
user.subscribe(($user) => {
    if ($user) {
        localStorage.setItem('user', JSON.stringify($user));
    } else {
        localStorage.removeItem('user');
    }
});

loggedIn.subscribe(($loggedIn) => {
    localStorage.setItem('loggedIn', $loggedIn ? 'true' : 'false');
});

// NEXT NEED USER_ID TO GET USER_GAMES WORKING --> ALREADY SEEMS TO BE SAVED