console.log("edit_recipes.js loaded")

document.addEventListener("DOMContentLoaded", function() {
    // Function to parse query parameters from the URL
    function getQueryParam(name) {
        let urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    let recipeId = getQueryParam('recipeId');
    console.log(recipeId);
    if (recipeId) {
        loadRecipeDetails(recipeId);
    }

    // Function to fetch recipe details and populate the form
    function loadRecipeDetails(recipeId) {
        fetch("http://localhost:8000/recipes/" + recipeId)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response error.");
                }
                return response.json();
             })
            .then(recipe => {
                // Populate the form fields with recipe details
                document.getElementById("recipeName").value = recipe.name;
                document.getElementById("recipeImage").value = recipe.image ||'';
                document.getElementById("recipeIngredients").value = recipe.ingredients.join(`\n`);
                document.getElementById("recipeSteps").value = recipe.steps.join('\n');
             })
             .catch(error => {
                console.error("Error loading recipe details:", error);
             });
    }

    // Add event listener for the recipe form submission
    document.getElementById("recipeEditForm").addEventListener("submit", (event) => {
        event.preventDefault ();

        let updateRecipe = {
            image: document.getElementById("recipeImage").value,
            name: document.getElementById("recipeName").value,
            ingredients: document.getElementById("recipeIngredients").value.split(',').map(item => item.trim()),
            steps: document.getElementById("recipeSteps").value.split('\n').map(item => item.trim()),
        };
        // Send a PUT request to update the recipe using API endpoint
        fetch("http://localhost:8000/recipes/" + recipeId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateRecipe),
        })
        .then(response => {
            if (response.ok) {
                console.log("Recipe updated successfully");
                // Redirect back to the all_recipes.html page
                window.location.href = "all_recipes.html";
            } else {
                console,log("Failed to update recipe");
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
        // Clear the form and hide it
        document.getElementById("recipeEditForm").reset();
    });
});

