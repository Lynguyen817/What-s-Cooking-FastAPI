
function searchRecipes(search_query) {
    let searchTerm = document.getElementById("search_query").value.toLowerCase();
    // Send search query to the server
    let url = "http:/recipes?query=" + encodeURIComponent(searchTerm)`;
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
            displaySearchResults(searchResults);
        })
        .catch(error => {
            console.error("Error fetching recipes", error);
        });
}


function displaySearchResults(searchResults) {
    let searchResultsDiv = document.getElementById("searchResult");
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


            // Add image if available
            if (recipe.image) {
                let recipeImage = document.createElement('img');
                recipeImage.src = recipe.image;
                recipeImage.alt = `${recipe.name} Image`;
                resultDiv.appendChild(recipeImage);
            }

            // Add ingredients list
            let ingredientsList = document.createElement('p');
            ingredientsList.textContent = `Ingredients: ${recipe.ingredients.join(', ')}`;

            // Add steps
            let stepsList = document.createElement('ol');
            stepsList.innerHTML = `<small>Steps</small>`;
            recipe.steps.forEach(step => {
                let stepItem = document.createElement('li');
                stepItem.textContent = step;
                stepsList.appendChild(stepItem);
            });

            // Append elements to the recipe item
            resultDiv.appendChild(recipeName);
            resultDiv.appendChild(recipeImage);
            resultDiv.appendChild(ingredientsList);
            resultDiv.appendChild(stepsList);

            // Append the resultDiv to the searchResultsDiv
            searchResultsDiv.appendChild(resultDiv);
        })
        .catch(error => {
            console.error("Error fetching recipes:", error);
        });
    }
