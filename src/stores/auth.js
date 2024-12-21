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


// src/stores/auth.js
import { writable } from "svelte/store";

// Global store to manage user login status
export const loggedIn = writable(false);
