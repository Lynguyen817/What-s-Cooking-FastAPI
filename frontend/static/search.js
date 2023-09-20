/**
 * Display search results in the specified target container.
 * searchResults - An array of search results to display.
 * targetContainer - The ID of the container where search results should be displayed.
 */
function displaySearchResults(searchResults, targetContainer) {
    console.log("Display search results in:", targetContainer);
    let searchResultsDiv = document.getElementById(targetContainer);

    if (!searchResultsDiv) {
        console.error("Element with ID 'searchResult' not found.");
        return;
    }
    searchResultsDiv.innerHTML = '';

    if (searchResults.length === 0) {
        searchResultsDiv.textContent = "No results found.";
        return;
    }

    searchResults.forEach(result => {
        // Create a div element for each search result
        let resultDiv = document.createElement('div');
        resultDiv.classList.add('search-result');


            // Add recipe name
            let recipeName = document.createElement('h2');
            recipeName.innerHTML = result.name.toUpperCase();

            let recipeImage;
            // Add image if available
            if (result.image) {
                let recipeImage = document.createElement('img');
                recipeImage.src = result.image;
                recipeImage.alt = `${result.name} Image`;
                resultDiv.appendChild(recipeImage);
            }

            // Add ingredients list
            let ingredientsList = document.createElement('p');
            ingredientsList.innerHTML = `<strong>Ingredients</strong>: ${result.ingredients.join(', ')}`;

            // Add steps
            let stepsList = document.createElement('ol');
            stepsList.innerHTML = `<small>Steps</small>`;
            result.steps.forEach(step => {
                let stepItem = document.createElement('li');
                stepItem.textContent = step;
                stepsList.appendChild(stepItem);
            });

            // Append elements to the recipe item
            resultDiv.appendChild(recipeName);
            resultDiv.appendChild(ingredientsList);
            resultDiv.appendChild(stepsList);
            if (recipeImage) {
                resultDiv.appendChild(recipeImage);
            }

            // Append the resultDiv to the searchResultsDiv
            searchResultsDiv.appendChild(resultDiv);
        });
    }

/**
 * Search for recipes using a given search query and display the results in the specified target container.
 * search_query - The search query entered by the user.
 * targetContainer - The ID of the container where search results should be displayed.
 */
function searchRecipes(search_query, targetContainer) {
    let searchTerm = search_query.toLowerCase();
    // Send search query to the server
    let url = "http://localhost:8000/recipes?query=" + encodeURIComponent(searchTerm);
    fetch(url, {
        method: "GET"
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response error.");
            }
            return response.json();
        })
        .then(searchResults => {
            console.log("Search results:", searchResults);
            displaySearchResults(searchResults, targetContainer);
        })
        .catch(error => {
            console.error("Error fetching recipes", error);
        });
}

