// Import constants and data from the "data.js" file
import { BOOKS_PER_PAGE, authors, genres, books } from "./data.js";

// Copy the 'books' array to 'matches'
const matches = books;
// Set the initial page number to 1
let page = 1;

// Check if 'books' is not defined or not an array, and throw an error if true
if (!books || !Array.isArray(books)) throw new Error('Source required');

// THEME
// Define 'day' and 'night' themes as objects with dark and light color values
const day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
};

const night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
};

// Select elements in the DOM related to theme settings
const themeButton = document.querySelector('[data-header-settings]');
const themeCancelButton = document.querySelector('[data-settings-cancel]');
const settingsOverlay = document.querySelector("[data-settings-overlay]");
const dataSettingsTheme = document.querySelector('[data-settings-theme]');
const body = document.querySelector('body');

// Function to apply a theme
function applyTheme(theme) {
    body.style.setProperty('--color-dark', theme.dark);
    body.style.setProperty('--color-light', theme.light);
}

// Event listeners for showing and hiding theme settings
themeButton.addEventListener('click', () => {
    settingsOverlay.style.display = "block";
});

themeCancelButton.addEventListener('click', () => {
    settingsOverlay.style.display = "none";
});

// 'saveButton' variable holds a reference to the save button element.
const saveButton = document.querySelector('[type="submit"][form="settings"]');

// Event listener for the save button in theme settings
saveButton.addEventListener('click', (event) => {
    event.preventDefault();

    // Apply theme based on the selected option
    if (dataSettingsTheme.value === 'day') {
        applyTheme(day);
    } else if (dataSettingsTheme.value === 'night') {
        applyTheme(night);
    }

    // Hide the theme settings overlay
    settingsOverlay.style.display = "none";
});

// Initially, apply the "day" theme
applyTheme(day);

// Clear the existing content in the data-list-items element
document.querySelector('[data-list-items]').innerHTML = '';
// Create a document fragment to hold preview elements
const fragment = document.createDocumentFragment();
// Set the initial start and end indices for book extraction
let startIndex = 0;
let endIndex = 36;
// Extract a subset of books based on the start and end indices
const extracted = books.slice(startIndex, endIndex);

// Iterate over the extracted books and create preview elements
for (const { author, image, title, id, description, published, genres } of extracted) {
    const preview = document.createElement('dl');
    preview.className = 'preview';
    preview.dataset.id = id;
    preview.dataset.title = title;
    preview.dataset.image = image;
    preview.dataset.subtitle = `${authors[author]} (${(new Date(published)).getFullYear()})`;
    preview.dataset.description = description;
    preview.dataset.genre = genres;

    // Create the preview's HTML structure using innerHTML and append the preview to the fragment
    preview.innerHTML = /*html*/ `
        <div>
            <image class='preview__image' src="${image}" alt="book pic"/>
        </div>
        <div class='preview__info'>
            <dt class='preview__title'>${title}</dt>
            <dt class='preview__author'> By ${authors[author]}</dt>
        </div>`;
    fragment.appendChild(preview);
}

// Select the element that will contain the book previews
const booklist1 = document.querySelector('[data-list-items]');
// Append all preview elements to the container
booklist1.appendChild(fragment);

// SEARCH BUTTON
// Select the search button element
const searchbutton = document.querySelector("[data-header-search]");
// Event listener for displaying the search overlay
searchbutton.addEventListener('click', () => {
    document.querySelector("[data-search-overlay]").style.display = "block";
});

// 'searchCancel' variable holds a reference to the cancel search button element.
const searchCancel = document.querySelector("[data-search-cancel]");
// Event listener for hiding the search overlay
searchCancel.addEventListener('click', () => {
    document.querySelector("[data-search-overlay]").style.display = "none";
});

// Create options for authors in the search select element
const authorSelect = document.querySelector("[data-search-authors]");
for (const authorId in authors) {
    const optionElement = document.createElement('option');
    optionElement.value = authorId;
    optionElement.textContent = authors[authorId];
    authorSelect.appendChild(optionElement);
}

// Create options for genres in the search select element
const genreSelect = document.querySelector("[data-search-genres]");
for (const genreId in genres) {
    const optionElement = document.createElement('option');
    optionElement.value = genreId;
    optionElement.textContent = genres[genreId];
    genreSelect.appendChild(optionElement);
}

// CODE DISPLAYS THE BOOK DETAILS
// Select the element that contains book previews
const detailsContainer = document.querySelector('[data-list-items]');
// Select elements related to book details
const overlay = document.querySelector('[data-list-active]');
const title = document.querySelector('[data-list-title]');
const subtitle = document.querySelector('[data-list-subtitle]');
const description = document.querySelector('[data-list-description]');
const image1 = document.querySelector('[data-list-image]');
const imageblur = document.querySelector('[data-list-blur]');
const detailsClose = document.querySelector('[data-list-close]');

// Event listener using event delegation for showing book details
detailsContainer.addEventListener('click', (event) => {
    const clickedElement = event.target.closest('.preview');

    if (clickedElement) {
        overlay.style.display = 'block';
        description.innerHTML = clickedElement.dataset.description || '';
        subtitle.innerHTML = clickedElement.dataset.subtitle || '';
        title.innerHTML = clickedElement.dataset.title || '';
        image1.setAttribute('src', clickedElement.dataset.image || '');
        imageblur.setAttribute('src', clickedElement.dataset.image || '');
    }
});

// Event listener for hiding book details
detailsClose.addEventListener('click', () => {
    overlay.style.display = 'none';
});

// Select the "Show More" button element
const showMoreButton = document.querySelector('[data-list-button]');

// Function to update the text content of the "Show More" button
function updateShowMoreButtonText() {
    const numItemsToShow = Math.min(books.length - endIndex);
    showMoreButton.textContent = `Show More (${numItemsToShow})`;
}

// Function to append previews to the fragment based on the updated indices
function appendPreviewsToFragment(startIndex, endIndex) {
    const fragment = document.createDocumentFragment();
    const extracted = books.slice(startIndex, endIndex);

    for (const { author, image, title, id, description, published } of extracted) {
        const preview = document.createElement('dl');
        preview.className = 'preview';
        preview.dataset.id = id;
        preview.dataset.title = title;
        preview.dataset.image = image;
        preview.dataset.subtitle = `${authors[author]} (${(new Date(published)).getFullYear()})`;
        preview.dataset.description = description;

        preview.innerHTML = /*html*/ `
            <div>
                <image class='preview__image' src="${image}" alt="book pic"/>
            </div>
            <div class='preview__info'>
                <dt class='preview__title'>${title}</dt>
                <dt class='preview__author'> By ${authors[author]}</dt>
            </div>`;
        fragment.appendChild(preview);
    }

    const booklist1 = document.querySelector('[data-list-items]');
    booklist1.appendChild(fragment);
}

// Event listener for the "Show More" button
showMoreButton.addEventListener('click', () => {
    // Update start and end indices
    startIndex += 36;
    endIndex += 36;

    // Update the text content of the "Show More" button
    updateShowMoreButtonText();

    // Append previews to the fragment based on the updated indices
    appendPreviewsToFragment(startIndex, endIndex);
});

// Initial setup
updateShowMoreButtonText();
appendPreviewsToFragment(startIndex, endIndex);
