let recipes;

console.log("Javascript file loaded.")
// Function to display all saved recipes
function displayAllRecipes() {
    console.log("Displaying all recipes for All Recipes page");
    // Fetch and display all recipes
    fetch("http://localhost:8000/get_all_recipes")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response error.");
            }
            return response.json();
        })
        .then(data => {
            recipes = data;
            let allRecipes = document.getElementById("allRecipes");
            // Clear the previous content
            allRecipes.innerHTML = '';

            recipes.forEach((recipe, index) => {
                let recipeObject = document.createElement('div');
                recipeObject.classList.add('recipe');

                // Add recipe name
                let recipeNameHeading = document.createElement('h2');
                recipeNameHeading.innerHTML = recipe.name.toUpperCase();

                let recipeImage;
                // Add image if available
                if (recipe.image) {
                    recipeImage = document.createElement('img');
                    recipeImage.src = recipe.image;
                    recipeImage.alt = `${recipe.name} Image`;
                    recipeObject.appendChild(recipeImage);
                }

                 // Create a delete button
                let deleteButton = document.createElement('button');
                deleteButton.innerHTML = `Delete`;
                deleteButton.onclick = function() {
                    deleteRecipe(recipe.id);
                };

                // Append elements to the recipe object
                recipeObject.appendChild(recipeNameHeading);
                recipeObject.appendChild(recipeImage);
                recipeObject.appendChild(deleteButton);

                allRecipes.appendChild(recipeObject);
                });
                console.log("Received recipes data", recipes);
            })
        .catch(error => {
            console.error("Error loading all recipes:", error);
        });
    }


function deleteRecipe(recipeID) {
    // Send a DELETE request to remove the recipe
    fetch(`/recipes/${recipeID}`, {
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
        displayAllRecipes();
    })
    .catch(error => {
        console.error("Error deleting recipe:", error);
    });
}


displayAllRecipes()


