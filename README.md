# What-s-Cooking-FastAPI
## **Introduction**

The Recipe Keeper API is designed to manage recipes. It uses FastAPI as the web framework and stores recipe data in a JSON file.

## **Features**

* Create, read, update, and delete (CRUD) recipes.
* Search for recipes by name.
* Retrieve all recipes.

## **API Endpoints**

**Search for Recipes**

* **Endpoint: /recipes**

* **Method**: GET
* **Parameters**: query (optional) - A string to search for recipes by name.
* **Description**: Retrieve all recipes or search for recipes by name.

**Retrieve All Recipes**

* **Endpoint: /get_all_recipes**
* **Method**: GET
* **Description**: Retrieve all recipes.

**Create a Recipe**

* **Endpoint: /recipes**
* **Method**: POST
* **Body**: Recipe details including name, ingredients, steps, and image.
* **Description**: Create a new recipe.

**Retrieve a Recipe**

* **Endpoint: /recipes/{recipe_id}**
* **Method**: GET
* **Parameters**: recipe_id - ID of the recipe to retrieve.
* **Description**: Retrieve a single recipe by its ID.

**Update a Recipe**

* **Endpoint: /recipes/{recipe_id}**
* **Method**: PUT
* **Parameters**: recipe_id - ID of the recipe to update.
* **Body**: Updated recipe details.
* **Description**: Update a recipe by its ID.

**Delete a Recipe**

* **Endpoint: /recipes/{recipe_id}**
* **Method**: DELETE
* **Parameters**: recipe_id - ID of the recipe to delete.
* **Description**: Delete a recipe by its ID.

## **Usage**

1. Clone this repository.
2. Install the required dependencies with pip install -r requirements.txt.
3. Run the API using the command uvicorn main:app --host 0.0.0.0 --port 8000.

## **Contributing**

Contributions to the Recipe Keeper API are welcome. If you have suggestions or want to report issues, please create a GitHub issue or a pull request.

Thank you for using the Recipe Keeper API!