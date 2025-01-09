import { writable } from 'svelte/store';

// Translations for different languages
export const translations = writable({
    en: {
        home: "Home",
        welcome: "Welcome",
        login: "Login / Register",
        account: "Account",
        logout: "Log Out",
        logIn: "Log In",
        register: "Register",
        addGame: "Add a New Game",
        name: "Name (required)",
        language: "Language",
        minPlayers: "Min Players (required)",
        maxPlayers: "Max Players (required)",
        numPlayers: "Number of Players",
        bggUrl: "BoardGameGeek URL (required)",
        imageUrl: "Image URL (required)",
        tag: "Tag (required)",
        category: "Category",
        description: "Description",
        rating: "Rating",
        lastPlayed: "Last Played",
        owner: "Owner",
        addGameButton: "Add Game",
        filterTitle: "Filters",
        mode: "Mode",
        myGames: "Show My Games",
        householdGames: "Show Household Games",
        moreOptions: "More options",
        hideOptions: "Hide options",
        filterByUsing: "Filter by using:",
        or: "OR",
        and: "AND",
        selectAll: "Select All",
        removeAll: "Remove All",
        resetAllOptions: "Reset All Options", // Added
    },
    es: {
        home: "Inicio",
        welcome: "Bienvenido",
        login: "Iniciar sesión / Registrarse",
        account: "Cuenta",
        logout: "Cerrar sesión",
        logIn: "Iniciar sesión",
        register: "Registrar",
        addGame: "Añadir un nuevo juego",
        name: "Nombre (requerido)",
        language: "Idioma (requerido)",
        minPlayers: "Mínimo de jugadores (requerido)",
        maxPlayers: "Máximo de jugadores (requerido)",
        numPlayers: "Número de jugadores",
        bggUrl: "URL de BoardGameGeek (requerido)",
        imageUrl: "URL de imagen (requerido)",
        tag: "Etiqueta (requerido)",
        category: "Categoría",
        description: "Descripción",
        rating: "Calificación",
        lastPlayed: "Última vez jugado",
        owner: "Propietario",
        addGameButton: "Añadir juego",
        filterTitle: "Filtros",
        mode: "Modo",
        myGames: "Mostrar mis juegos",
        householdGames: "Mostrar juegos del hogar",
        moreOptions: "Más opciones",
        hideOptions: "Ocultar opciones",
        filterByUsing: "Filtrar por usar:",
        or: "O",
        and: "Y",
        selectAll: "Seleccionar todo",
        removeAll: "Eliminar todo",
        resetAllOptions: "Restablecer todas las opciones", // Added
    },
    de: {
        home: "Startseite",
        welcome: "Willkommen",
        login: "Anmelden / Registrieren",
        account: "Konto",
        logout: "Abmelden",
        logIn: "Anmelden",
        register: "Registrieren",
        addGame: "Neues Spiel hinzufügen",
        name: "Name (erforderlich)",
        language: "Sprache (erforderlich)",
        minPlayers: "Min Spieler (erforderlich)",
        maxPlayers: "Max Spieler (erforderlich)",
        numPlayers: "Anzahl der Spieler",
        bggUrl: "BoardGameGeek URL (erforderlich)",
        imageUrl: "Bild-URL (erforderlich)",
        tag: "Tag (erforderlich)",
        category: "Kategorie",
        description: "Beschreibung",
        rating: "Bewertung",
        lastPlayed: "Zuletzt gespielt",
        owner: "Besitzer",
        addGameButton: "Spiel hinzufügen",
        filterTitle: "Filter",
        mode: "Modus",
        myGames: "Meine Spiele anzeigen",
        householdGames: "Haushaltsspiele anzeigen",
        moreOptions: "Mehr Optionen",
        hideOptions: "Optionen verbergen",
        filterByUsing: "Filtern durch Verwendung:",
        or: "ODER",
        and: "UND",
        selectAll: "Alle auswählen",
        removeAll: "Alle entfernen",
        resetAllOptions: "Alle Optionen zurücksetzen", // Added
    },
    pt: {
        home: "Início",
        welcome: "Bem-vindo",
        login: "Entrar / Registrar",
        account: "Conta",
        logout: "Sair",
        logIn: "Entrar",
        register: "Registrar",
        addGame: "Adicionar um novo jogo",
        name: "Nome (obrigatório)",
        language: "Idioma (obrigatório)",
        minPlayers: "Mínimo de jogadores (obrigatório)",
        maxPlayers: "Máximo de jogadores (obrigatório)",
        numPlayers: "Número de jogadores",
        bggUrl: "URL do BoardGameGeek (obrigatório)",
        imageUrl: "URL da imagem (obrigatório)",
        tag: "Etiqueta (obrigatório)",
        category: "Categoria",
        description: "Descrição",
        rating: "Avaliação",
        lastPlayed: "Última vez jogado",
        owner: "Proprietário",
        addGameButton: "Adicionar jogo",
        filterTitle: "Filtros",
        mode: "Modo",
        myGames: "Mostrar meus jogos",
        householdGames: "Mostrar jogos da casa",
        moreOptions: "Mais opções",
        hideOptions: "Esconder opções",
        filterByUsing: "Filtrar por usar:",
        or: "OU",
        and: "E",
        selectAll: "Selecionar todos",
        removeAll: "Remover todos",
        resetAllOptions: "Redefinir todas as opções", // Added
    },
    nl: {
        home: "Home",
        welcome: "Welkom",
        login: "Inloggen / Registreren",
        account: "Account",
        logout: "Uitloggen",
        logIn: "Inloggen",
        register: "Registreren",
        addGame: "Nieuw spel toevoegen",
        name: "Naam",
        language: "Taal",
        minPlayers: "Min spelers (verplicht)",
        maxPlayers: "Max spelers (verplicht)",
        numPlayers: "Aantal spelers",
        bggUrl: "BoardGameGeek URL (verplicht)",
        imageUrl: "Afbeeldings-URL (verplicht)",
        tag: "Tag (verplicht)",
        category: "Categorie",
        description: "Beschrijving",
        rating: "Beoordeling",
        lastPlayed: "Laatst gespeeld",
        owner: "Eigenaar",
        addGameButton: "Spel toevoegen",
        filterTitle: "Filters",
        mode: "Modus",
        myGames: "Toon mijn spellen",
        householdGames: "Toon huishoudspellen",
        moreOptions: "Meer opties",
        hideOptions: "Verberg opties",
        filterByUsing: "Filteren door gebruik:",
        or: "OF",
        and: "EN",
        selectAll: "Alles selecteren",
        removeAll: "Alles verwijderen",
        resetAllOptions: "Reset alle opties", // Added
    }
});
