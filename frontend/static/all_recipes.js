
console.log("Javascript file loaded.")
// Function to display all saved recipes
function displayAllRecipes() {
    console.log("Displaying all recipes for All Recipes page");
    // Fetch and display all recipes
    fetch("/get_all_recipes")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response error.");
            }
            return response.json();
        })
        .then(recipes => {
            let allRecipes = document.getElementById("allRecipes");
            // Clear the previous content
            allRecipes.innerHTML = '';

            recipes.forEach((recipe, index) => {
                let recipeObject = document.createElement('div');
                recipeObject.classList.add('recipe');

                // Add recipe name
                let recipeNameHeading = document.createElement('h2');
                recipeNameHeading.innerHTML = recipe.name.toUpperCase();


                // Add image if available
                if (recipe.image) {
                    let recipeImage = document.createElement('img');
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

                // Create an edit button
                let editButton = document.createElement('button');
                editButton.innerHTML = `Edit`;
                editButton.onclick = function() {
                    editRecipe(recipe.id);
                };

                // Append elements to the recipe object
                recipeObject.appendChild(recipeNameHeading);
                recipeObject.appendChild(recipeImage);
                recipeObject.appendChild(deleteButton);
                recipeObject.appendChild(editButton);

                allRecipes.appendChild(recipeObject);
                });
                console.log("Received recipes data", recipes);
            })
        .catch(error => {
            console.error("Error loading all recipes:", error);
        });
    }

displayAllRecipes()


