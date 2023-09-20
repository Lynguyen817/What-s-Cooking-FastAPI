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

            // Append elements to the recipe item
            recipeItem.appendChild(recipeNameHeading);
            recipeItem.appendChild(recipeImage);
            recipeItem.appendChild(ingredientsList);
            recipeItem.appendChild(stepsList);

            recipesList.appendChild(recipeItem);
            });
        })
        .catch(error => {
            console.error("Error fetching recipes:", error);
        });
    }


// Fetch and display recipes when the page loads
displayRecipes();
