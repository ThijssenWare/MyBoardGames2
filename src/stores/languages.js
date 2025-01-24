// src/stores/languages.js
import { writable } from "svelte/store";

// List of available languages with flag images (URLs)
export const languages = writable([
  { code: "en", name: "English", flag: "/flags/en.png" },  // Flag for English
  { code: "es", name: "Spanish", flag: "/flags/es.png" },  // Flag for Spanish
  { code: "de", name: "German", flag: "/flags/de.png" },   // Flag for German
  { code: "pt", name: "Portuguese", flag: "/flags/pt.png" }, // Flag for Portuguese
  { code: "nl", name: "Dutch", flag: "/flags/nl.png" },   // Flag for Dutch
  { code: "other", name: "Other", flag: "/flags/other.png" },  // Optional 'Other' language flag
]);

// Retrieve the saved language from localStorage or default to English
const savedLanguage = JSON.parse(localStorage.getItem("selectedLanguage")) || {
  code: "en",
  name: "English",
  flag: "/flags/en.png",
};

// Global store for selected language
export const selectedLanguage = writable(savedLanguage);

// Subscribe to the store and save changes to localStorage
selectedLanguage.subscribe((value) => {
  localStorage.setItem("selectedLanguage", JSON.stringify(value));
});
