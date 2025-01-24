// main.js

/** 
 * main.js

## Folder Structure:
- src/main.js

## Description:
This is the entry point of the Svelte application. It initializes the App component.

## Variables Exported:
- None.

## Variables Expected:
- None.

## Dependencies:
- `App.svelte`: The root component of the application.
 */


import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'Board Game Catalogue'
	}
});

export default app;