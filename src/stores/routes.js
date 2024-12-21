/** 
 * routes.js
 *
 * ## Folder Structure:
 * - src/stores/routes.js
 *
 * ## Description:
 * This file manages the application's manual routing system via a writable store.
 *
 * ## Variables Exported:
 * - `currentRoute` (writable store): Holds the current navigation route as a string.
 * - `navigate` (function): A function to update the `currentRoute`.
 *
 * ## Variables Expected:
 * - None.
 *
 * ## Dependencies:
 * - `writable` from `svelte/store`: Provides a reactive store for state management.
 */

import { writable } from "svelte/store";

// Writable store to keep track of the current route
export const currentRoute = writable("/");

// Function to navigate to a new route
export const navigate = (route) => {
  currentRoute.set(route);
};
