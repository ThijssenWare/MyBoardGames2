Project Overview:
This project is a board game management and social platform built with Svelte and Svelte-Navigator. It allows users to browse, filter, and view detailed information about board games. Users can log in, register, and log out, with user data managed via a central store (authStore.js). The platform also supports token-based sharing of game lists.

Folder Structure:
src
stores
authStore.js: Manages user authentication, including login state and user data. Provides setUser() to set the user and logout() to clear the user data.
gameStore.js: Manages board game data, with a mock dataset of games. Includes filters for game categories and ratings, and supports selecting a game for detailed view.
userStore.js: Another store for managing user data, including login functionality.
components
FilterSidebar.svelte: A filter panel for selecting categories and rating filters for games.
GameList.svelte: Displays a grid of games based on the applied filters.
GameDetail.svelte: Shows detailed information about a specific game.
LoginForm.svelte: Handles user login functionality with a username and password.
RegisterForm.svelte: Allows new users to register with a username and password.
SharedList.svelte: Allows users to input a shared list token and view shared games.
pages
Home.svelte: The landing page, which shows a welcome message to the logged-in user or prompts them to log in.
GamePage.svelte: A page for viewing detailed information about a selected game.
Login.svelte: A page where users can log in with credentials.
Key Features:
Authentication:

Users can log in, log out, and register.
Authentication state is stored in authStore (with a writable user store).
Upon login, the backend responds with a JWT token, which is stored in localStorage.
After login, user data is stored in the userStore and they are redirected to the home page.
Board Game Data:

Games are managed in the gameStore with mock data, including categories, ratings, and player counts.
The filteredGames derived store filters games based on the selected category and rating.
Users can view a list of games (GameList.svelte), and click on a game to view detailed information (GameDetail.svelte).
Filtering:

Filters for categories and ratings are provided in FilterSidebar.svelte.
The game list (GameList.svelte) updates in real-time based on the selected filters.
Routing:

Svelte-Navigator is used for routing between pages, including home, login, and game detail pages.
After logging out, users are redirected to the home page.
Shared Game List:

The SharedList.svelte component allows users to enter a shared list token to view shared games.
Mock data for shared games is used, and the token input simulates fetching shared lists.
Additional Information:
Login Flow: In Login.svelte, users submit their credentials to an API (/api/login), which returns a JWT token. This token is stored in localStorage and used for user authentication.
Game Filters: Filters are applied via a dropdown for selecting categories (Strategy, Cooperative, etc.) and a rating filter (1 through 10).
Game Details: Each game detail page (GamePage.svelte) pulls data from the store and displays detailed information, including categories, rating, language, last played date, etc.
