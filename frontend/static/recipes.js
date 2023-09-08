let searchForm = document.getElementById('searchForm')
let recipeForm = document.getElementById('recipeForm');
let recipeName = document.getElementById('recipeName');
let ingredients = document.getElementById('ingredients');
let method = document.getElementById('method');
let recipeImage = document.getElementById('recipeImage');
let recipesList = document.getElementById('recipesList');


let recipes = [];

document.getElementById("recipeForm").addEventListener('submit', (event) => {
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
        // Fetch and display the updated list of recipes
        displayRecipes();
    })
    .catch(error => {
        console.error("Error adding recipe:", error);
        console.log("Server Error Response")
    });
});


function displayRecipes() {
    // Fetch and display recipes
    fetch("http://localhost:8000/recipes")
    .then(response => response.json())
    .then(recipe => {
        let recipesList = document.getElementById("recipesList");
        // Clear the previous content
        recipesList.innerHTML = '';

        recipe.forEach((recipe, index) => {
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
    fetch(`"http://localhost:8000/recipes"/${recipeID}`, {
        method: "DELETE"
    })
    .then(response => response.json())
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

// Add an event listener to the form submission
searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let searchTerm = event.target[0].value.toLowerCase();

    // Send the search query to the sever
    fetch(`/recipes?query=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            displayRecipes(data)
        })
        .catch(error => {
            console.error("Error fetching recipes", error);
        });
});