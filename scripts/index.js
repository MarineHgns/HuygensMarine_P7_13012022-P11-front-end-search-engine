import { recipes } from "../recipes.js";
import { elementsTag } from "./listDisplay.js";
import recipeFactory from "../scripts/recipesDisplay.js";
import createBoxTags from "./tagDisplay.js";
import JumpSearchList from "../scripts/search.js";
import search from "./search.js";

// Recipes
function displayRecipes() {
  const recipiesContainer = document.getElementById("recipes");
  recipiesContainer.innerHTML = "";

  let recipeCardTemplate = "";
  for (const recipe of recipes) {
    const recipeModel = new recipeFactory(recipe, recipeCardTemplate);
    recipeCardTemplate = recipeModel.createCardRecipe();
  }
  recipiesContainer.innerHTML = recipeCardTemplate;
}

displayRecipes();

// Tag

createBoxTags();

JumpSearchList();
