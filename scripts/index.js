import { recipes } from "../recipes.js";
import RecipeDisplay from "./recipesDisplay.js";
import createListElements from "./listDisplay.js";
import tagDisplay from "./tagDisplay.js";
import filterTagsbyInputTag from "./searchItem.js";

function buildDom() {
  RecipeDisplay.createCardRecipe(recipes);
  createListElements();
  tagDisplay.createBoxTags();
  filterTagsbyInputTag();
}

buildDom();
