import { recipes } from "../recipes.js";
import createListElements, { listTag } from "./listDisplay.js";
import RecipeDisplay from "./recipesDisplay.js";

let resultRecipesMiniTags = [];
let recipesRepetition = [];
let totalRecipesMiniTags = [];
let listMiniTags;

export default function UpdateAfterRemoveTag() {
  // remove tag from list
  document.querySelectorAll(".search-item").forEach((item) => {
    item.remove();
  });

  // grab all tag with class "selected"
  let tagsSelected = document.querySelectorAll(".selected");
  let totalSelected = [];

  tagsSelected.forEach((tagsSelected) => {
    totalSelected.push(tagsSelected.innerText);
  });

  listMiniTags = totalSelected;
  listMiniTags = listMiniTags.toString();
  listMiniTags = listMiniTags.toLowerCase();

  // filter recipies with tag

  resultRecipesMiniTags = recipes.filter((obj) => {
    return (
      obj.name.toLowerCase().includes(listMiniTags) ||
      obj.description.toLowerCase().includes(listMiniTags) ||
      obj.ingredients.find((ingredient) => ingredient.ingredient.toLowerCase().includes(listMiniTags))
    );
  });
  // push recipies
  recipesRepetition.push(...resultRecipesMiniTags);
  // create new list of elements tags
  let ingredientsResult = [];
  let reducedIngredient = [];

  // ing
  resultRecipesMiniTags.forEach((recipe) => {
    if (recipe.ingredients.length) {
      const ingredientsMapResult = recipe.ingredients.map((ingr) => ingr.ingredient.toLowerCase());
      ingredientsResult.push(...ingredientsMapResult);
      reducedIngredient = [...new Set(ingredientsResult)];
    }
  });

  reducedIngredient.forEach((element) => {
    document.querySelector(".search-list-ingredients").append(listTag(element, "ingredients"));
  });

  // app
  let applianceResult = [];
  let reducedappliance = [];
  resultRecipesMiniTags.forEach((recipe) => {
    if (recipe.appliance.length) {
      const appliancesMapResult = recipe.appliance;
      applianceResult.push(appliancesMapResult);
      reducedappliance = [...new Set(applianceResult)];
    }
  });
  reducedappliance.forEach((element) => {
    document.querySelector(".search-list-appareils").append(listTag(element, "appliance"));
  });

  // ust
  let ustensilsResult = [];
  let reducedUstensils = [];
  resultRecipesMiniTags.forEach((recipe) => {
    if (recipe.ustensils.length) {
      const ustensilsMapResult = recipe.ustensils;
      ustensilsResult.push(...ustensilsMapResult);
      reducedUstensils = [...new Set(ustensilsResult)];
    }
  });
  reducedUstensils.forEach((element) => {
    document.querySelector(".search-list-ustensils").append(listTag(element, "ustensils"));
  });

  totalRecipesMiniTags = [...new Set(resultRecipesMiniTags)];

  createListElements();
  createCardRecipesTagsUpdate(totalRecipesMiniTags);
}

// create card recipes
function createCardRecipesTagsUpdate(results) {
  results.forEach((recipe) => {
    RecipeDisplay.createCardRecipe(results);
  });
}
