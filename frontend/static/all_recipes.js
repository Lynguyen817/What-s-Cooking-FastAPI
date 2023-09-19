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

                // Create an Edit button
                let editButton = document.createElement('button');
                editButton.innerHTML = `Edit`;
                editButton.onclick = function() {
                    localStorage.setItem('recipeToEdit', JSON.stringify(recipe));
                    window.location.href = "edit_recipe.html";
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


// Delete a recipe from all saved recipes
function deleteRecipe(recipeID) {
    // Send a DELETE request to remove the recipe
    fetch("http://localhost:8000/recipes/" + recipeID, {
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
//
//
//// Edit a recipe
//function editRecipe (recipeId) {
//    let recipeToEdit = recipes.find( recipe => recipe.id === parseInt(recipeId));
//    if (recipeToEdit) {
//        let editForm = document.getElementById("editForm");
//        let recipeEditForm = document.getElementById("recipeEditForm");
//
//        editForm.style.display = "block";
//        recipeEditForm.recipeID.value = recipeToEdit.id;
//        recipeEditForm.recipeName.value = recipeToEdit.name;
//        recipeEditForm.recipeIngredients.value = recipeToEdit.ingredients;
//        recipeEditForm.recipeSteps.value = recipeToEdit.steps;
//    }
//}
//
//// Add event listener for the recipe form submission
//document.getElementById("recipeEditForm").addEventListener("submit", (event) => {
//    event.preventDefault ();
//
//    let recipeId = document.getElementById("recipeId").value;
//    let updateRecipe = {
//        name: document.getElementById("recipeName").value,
//        ingredients: document.getElementById("recipeIngredients").value.split(',').map(item => item.trim()),
//        steps: document.getElementById("recipeSteps").value.split('\n').map(item => item.trim()),
//    };
//    // Send a PUT request to update the recipe using API endpoint
//    // Replace the following line with actual API call
//    fetch("http://localhost:8000/recipes/" + recipeId, {
//        method: "PUT",
//        headers: {
//            "Content-Type": "application/json",
//        },
//        body: JSON.stringify(updatedRecipe),
//    })
//    .then(response => {
//        if (response.ok) {
//            console.log("Recipe updated successfully");
//        } else {
//            console,log("Failed to update recipe");
//        }
//    })
//    .catch(error => {
//        console.error("Error:", error);
//    });
//    // Clear the form and hide it
//    document.getElementById("recipeEditForm").reset();
//    document.getElementById("editForm").style.display = "none";
//});


displayAllRecipes()


