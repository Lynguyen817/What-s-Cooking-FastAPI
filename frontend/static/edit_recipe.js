

// Retrieve the recipe data from local storage
let recipeToEdit = JSON.parse(localStorage.getItem('recipeToEdit'));
if (recipeToEdit) {
    let editForm = document.getElementById("editForm");
    let recipeEditForm = document.getElementById("recipeEditForm");

    editForm.style.display = "block";
    recipeEditForm.recipeID.value = recipeToEdit.id;
    recipeEditForm.recipeName.value = recipeToEdit.name;
    recipeEditForm.recipeIngredients.value = recipeToEdit.ingredients;
    recipeEditForm.recipeSteps.value = recipeToEdit.steps;
}


// Add event listener for the recipe form submission
document.getElementById("recipeEditForm").addEventListener("submit", (event) => {
    event.preventDefault ();

    let recipeId = document.getElementById("recipeId").value;
    let updateRecipe = {
        name: document.getElementById("recipeName").value,
        ingredients: document.getElementById("recipeIngredients").value.split(',').map(item => item.trim()),
        steps: document.getElementById("recipeSteps").value.split('\n').map(item => item.trim()),
    };
    // Send a PUT request to update the recipe using API endpoint
    // Replace the following line with actual API call
    fetch("http://localhost:8000/recipes/" + recipeId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRecipe),
    })
    .then(response => {
        if (response.ok) {
            console.log("Recipe updated successfully");
        } else {
            console,log("Failed to update recipe");
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
    // Clear the form and hide it
    document.getElementById("recipeEditForm").reset();
    document.getElementById("editForm").style.display = "none";
});