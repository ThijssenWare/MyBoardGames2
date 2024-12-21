<!-- 
App.svelte

## Folder Structure:
- src/App.svelte

## Description:
This is the root component of the application. It handles routing and dynamically renders different pages (Home, GameDetails, or AddGame) based on the current route.

## Variables Exported:
- None.

## Variables Expected:
- None directly, but it relies on:
    - `currentRoute` store to manage the current navigation route.

## Dependencies:
- `currentRoute` from `stores/routes.js`: Reactive navigation state.
- `Home.svelte`: Component for the homepage.
- `GameDetails.svelte`: Component for game details view.
- `AddGame.svelte`: Component for adding new games.
-->

<!-- App.svelte -->
<script>
	import { currentRoute, navigate } from "./stores/routes";
	import Home from "./pages/Home.svelte";
	import GameDetails from "./pages/GameDetails.svelte";
	import AddGame from "./pages/AddGame.svelte";
  
	let route = "/";
  
	// Subscribe to route changes
	$: currentRoute.subscribe((value) => {
	  route = value;
	});
  
	// Dynamically determine which component to render
	let Component;
	let componentProps = {};
  
	$: {
	  if (route === "/") {
		Component = Home;
		componentProps = {};
	  } else if (route.startsWith("/game-details/")) {
		Component = GameDetails;
		const gameId = route.split("/")[2]; // Extract the game ID
		componentProps = { gameId };
	  } else if (route === "/add-game") {
		Component = AddGame;
		componentProps = {};
	  } else {
		Component = null; // Handle 404
	  }
	}
  
	// Function to navigate back to the Home page
	const goHome = () => {
	  navigate("/");
	};
  </script>
  
  <!-- Conditional Rendering of Components -->
  {#if Component}
	<svelte:component this={Component} {...componentProps} />
  {:else}
	<div class="not-found">
	  <h1>404: Page Not Found</h1>
	  <button on:click={goHome}>Go Back Home</button>
	</div>
  {/if}
  
  <style>
	.not-found {
	  text-align: center;
	  margin-top: 50px;
	}
  
	.not-found h1 {
	  font-size: 2rem;
	  color: red;
	}
  
	.not-found button {
	  margin-top: 20px;
	  padding: 0.5rem 1rem;
	  background-color: turquoise;
	  color: white;
	  border: none;
	  cursor: pointer;
	  border-radius: 5px;
	  transition: background-color 0.2s ease;
	}
  
	.not-found button:hover {
	  background-color: #40e0d0;
	}
  </style>
  
  