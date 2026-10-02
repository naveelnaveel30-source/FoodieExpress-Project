let activeCategory = 'all';

/**
 * Filter recipes by category (Breakfast, Lunch, Dinner, Dessert, All)
 * @param {string} category 
 */
function filterRecipes(category) {
    activeCategory = category;

    // Highlight active category button
    const categoryButtons = document.querySelectorAll('#categories button');
    categoryButtons.forEach(button => {
        if (button.textContent.trim().toLowerCase() === category.toLowerCase()) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    // Apply filters
    applyFilters();
}

/**
 * Search recipes based on input query
 * Called when the Search button is clicked or Enter is pressed
 */
function searchRecipes() {
    applyFilters();
}

/**
 * Applies both category filter and search query simultaneously
 */
function applyFilters() {
    const searchInput = document.getElementById('search').value.toLowerCase().trim();
    const recipeCards = document.querySelectorAll('#recipesList .card');

    recipeCards.forEach(card => {
        const recipeName = (card.getAttribute('data-name') || '').toLowerCase();
        const recipeCategory = (card.getAttribute('data-category') || '').toLowerCase();

        // Check if card matches category
        const matchesCategory = (activeCategory === 'all' || recipeCategory === activeCategory.toLowerCase());
        
        // Check if card matches search input
        const matchesSearch = recipeName.includes(searchInput);

        // Show card only if both conditions are met
        if (matchesCategory && matchesSearch) {
            card.style.display = ''; // Restores default CSS display
        } else {
            card.style.display = 'none';
        }
    });
}

/**
 * Toggle favorite button state (Heart icon)
 * @param {HTMLElement} button 
 */
function favorite(button) {
    button.classList.toggle('liked');

    if (button.classList.contains('liked')) {
        button.innerHTML = '♥️'; // Filled heart
        button.style.color = '#e74c3c'; // Red color
    } else {
        button.innerHTML = '♡'; // Outline heart
        button.style.color = ''; // Reset color
    }
}

// Event Listeners on Load
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    
    if (searchInput) {
        // Optional: Trigger search on 'Enter' key press
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                searchRecipes();
            }
        });
    }

    // Set 'All' category button as active by default
    const allButton = document.querySelector('#categories button');
    if (allButton) {
        allButton.classList.add('active');
    }
});