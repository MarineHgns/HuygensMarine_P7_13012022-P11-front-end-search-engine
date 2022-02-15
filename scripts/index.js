import { recipes } from "../recipes.js";
import { elementsTag } from "./listDisplay.js";
import recipeFactory from "../scripts/recipesDisplay.js";
import createBoxTags from "./tagDisplay.js";
import binarySearch from "./binarySearch.js";
import filterTagsbyInputTag from "./searchItem.js";

// Recipes
function displayRecipes() {
  const recipesContainer = document.getElementById("recipes");
  recipesContainer.innerHTML = "";

  let recipeCardTemplate = "";
  for (const recipe of recipes) {
    const recipeModel = new recipeFactory(recipe, recipeCardTemplate);
    recipeCardTemplate = recipeModel.createCardRecipe();
  }
  recipesContainer.innerHTML = recipeCardTemplate;
}

displayRecipes();

// Binary Search
binarySearch();

// filter tag with input search
filterTagsbyInputTag();
