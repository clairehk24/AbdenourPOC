// Function to display filtered cards based on selected filters
function displayFilteredCards() {
    const selectedFilters = Array.from(document.querySelectorAll('.filter:checked')).map(checkbox => checkbox.value);
    const allCards = document.querySelectorAll('.resource-item');

    // Show or hide each card based on selected filters
    allCards.forEach(card => {
        const cardType = card.getAttribute('data-filter');
        card.style.display = selectedFilters.length === 0 || selectedFilters.includes(cardType) ? 'block' : 'none';
    });
}

// Apply Filters Button Functionality
document.getElementById('apply-filters').addEventListener('click', function () {
    displayFilteredCards();
});

// Clear Filters Button Functionality
document.getElementById('clear-filters').addEventListener('click', function () {
    document.querySelectorAll('.filter').forEach(checkbox => checkbox.checked = false); // Uncheck all filters
    displayFilteredCards(); // Show all cards
});

// Initial display of all resource cards on page load
displayFilteredCards();
