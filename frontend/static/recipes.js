let recipeForm = document.getElementById('recipeForm');
let recipeName = document.getElementById('recipeName');
let ingredients = document.getElementById('ingredients');
let method = document.getElementById('method');
let recipeImage = document.getElementById('recipeImage');
let recipesList = document.getElementById('recipesList');


let recipes = [];

recipeForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let enteredRecipeName = recipeName.value;
    let enteredIngredients = ingredients.value.split(',').map(item => item.trim());
    let enteredSteps = method.value.split('\n').map(item => item.trim());
    let enteredImage = recipeImage.value;

    // Create a new recipe object
    let newRecipe = {
        name: enteredRecipeName,
        ingredients: enteredIngredients,
        steps: enteredSteps,
        image: enteredImage

    };

    // Send a POST request to add the new recipe
    fetch("http://localhost:8000/recipes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipe),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response error.");
        }
        // Log the response for debugging
        console.log("Server Response", response);
        return response.json();
    })
    .then(data => {
        // Handle success
        console.log("Recipe added successfully:", data);
        // Clear the form
        document.getElementById("recipeForm").reset();
        // Push the new recipe into the recipes array
        recipes.push(data);
        // Fetch and display the updated list of recipes
        displayRecipes();
    })
    .catch(error => {
        console.error("Error adding recipe:", error);
        console.log("Server Error Response");
    });
});


// Function to display a single recipe
function displayRecipes(recipesData = recipes) {
    // Fetch and display recipes
    fetch("http://localhost:8000/recipes")
    .then(response => response.json())
    .then(recipes => {
        let recipesList = document.getElementById("recipesList");
        // Clear the previous content
        recipesList.innerHTML = '';

        recipesData.forEach((recipe, index) => {
            let recipeItem = document.createElement('div');
            recipeItem.classList.add('recipe');

            // Add recipe name
            let recipeNameHeading = document.createElement('h2');
            recipeNameHeading.innerHTML = recipe.name.toUpperCase();


            // Add image if available
            if (recipe.image) {
                let recipeImage = document.createElement('img');
                recipeImage.src = recipe.image;
                recipeImage.alt = `${recipe.name} Image`;
                recipeItem.appendChild(recipeImage);
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

             // Create a delete button
            let deleteButton = document.createElement('button');
            deleteButton.innerHTML = `Delete`;
            deleteButton.onclick = function() {
                deleteRecipe(index);
            };

            // Create an edit button
            let editButton = document.createElement('button');
            editButton.innerHTML = `Edit`;
            editButton.onclick = function() {
                editRecipe(index);
            };

            // Append elements to the recipe item
            recipeItem.appendChild(recipeNameHeading);
            recipeItem.appendChild(recipeImage);
            recipeItem.appendChild(ingredientsList);
            recipeItem.appendChild(stepsList);
            recipeItem.appendChild(deleteButton);
            recipeItem.appendChild(editButton)

            recipesList.appendChild(recipeItem);
            });
        })
        .catch(error => {
            console.error("Error fetching recipes:", error);
        });
    }


function deleteRecipe(recipeID) {
    // Send a DELETE request to remove the recipe
    fetch(`"http:/localhost:8000/recipes"/${recipeID}`, {
        method: "DELETE"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response error.");
        }
    return response.text();
    })
    .then(data => {
        console.log("Recipe deleted successfully:", data);
        // Fetch and display the updated list od recipes
        displayRecipes();
    })
}


function editRecipe(recipeID) {
    let recipeToEdit = recipes.find(recipe => recipe.id === recipeID);

    //  Populate the form fields with existing recipe details
    recipeName.value = recipeToEdit.name;
    ingredients.value = recipeToEdit.ingredients.join(', ');
    method.value = recipeToEdit.steps.join(`\n`);
    recipeImage.value = recipeToEdit.image;
    if (recipeToEdit.image) {
        recipeImage.src = recipeToEdit.image;
    }
}

// Fetch and display recipes when the page loads
displayRecipes();

//
//console.log("JavaScript file loaded");
//// Add an event listener to the search form
//searchForm.addEventListener('submit', (event) => {
//    event.preventDefault();
//    let searchQuery = document.getElementById("search_query").value.toLowerCase();
//    console.log("Search Query:", searchQuery);
//    searchRecipes(searchQuery);
//});
//
//function searchRecipes(search_query) {
//    let searchTerm = document.getElementById("search_query").value.toLowerCase();
//    // Send search query to the server
//    let url = "http://127.0.0.1:8000/recipes?query=Pasta "
////    let url = `"http://localhost:8000/recipes?query="${encodeURIComponent(searchTerm)}`;
//    fetch(url, {
//        method: "GET"
//        })
//        .then(response => {
//            if (!response.ok) {
//                throw new Error("Network response error.");
//            }
//            return response.json();
//        })
//        .then(searchResults => {
//            console.log("Search results:", searchResults);
//            displayRecipes(searchResults);
//        })
//        .catch(error => {
//            console.error("Error fetching recipes", error);
//        });
//}

//
//
//console.log("JavaScript file loaded");
//// Add an event listener to the "All Recipes" button after the DOM is loaded
//document.addEventListener("DOMContentLoaded", function () {
//    console.log("Before getElementById");
//    let allRecipesButton = document.getElementById('allRecipesButton');
//    console.log("Button:", allRecipesButton);
//    if (allRecipesButton) {
//        allRecipesButton.addEventListener("click", function(event) {
//            event.preventDefault();
//            displayAllRecipes();
//        });
//    }
//});
//
//// Function to display all saved recipes
//function displayAllRecipes(recipes) {
//    console.log("Displaying all recipes");
//    // Fetch and display all recipes
//    fetch("/get_all_recipes")
//        .then(response => {
//            if (!response.ok) {
//                throw new Error("Network response error.");
//            }
//            return response.json();
//        })
//        .then(recipes => {
//            let allRecipes = document.getElementById("allRecipes");
//            // Clear the previous content
//            allRecipes.innerHTML = '';
//
//            recipes.forEach((recipe, index) => {
//                let recipeObject = document.createElement('div');
//                recipeObject.classList.add('recipe');
//
//                // Add recipe name
//                let recipeNameHeading = document.createElement('h2');
//                recipeNameHeading.innerHTML = recipe.name.toUpperCase();
//
//
//                // Add image if available
//                if (recipe.image) {
//                    let recipeImage = document.createElement('img');
//                    recipeImage.src = recipe.image;
//                    recipeImage.alt = `${recipe.name} Image`;
//                    recipeObject.appendChild(recipeImage);
//                }
//
//                 // Create a delete button
//                let deleteButton = document.createElement('button');
//                deleteButton.innerHTML = `Delete`;
//                deleteButton.onclick = function() {
//                    deleteRecipe(recipe.id);
//                };
//
//                // Create an edit button
//                let editButton = document.createElement('button');
//                editButton.innerHTML = `Edit`;
//                editButton.onclick = function() {
//                    editRecipe(recipe.id);
//                };
//
//                // Append elements to the recipe object
//                recipeObject.appendChild(recipeNameHeading);
//                recipeObject.appendChild(recipeImage);
//                recipeObject.appendChild(deleteButton);
//                recipeObject.appendChild(editButton);
//
//                allRecipes.appendChild(recipeObject);
//                });
//                console.log("Received recipes data", recipes);
//            })
//        .catch(error => {
//            console.error("Error loading all recipes:", error);
//        });
//    }
//
//
//
