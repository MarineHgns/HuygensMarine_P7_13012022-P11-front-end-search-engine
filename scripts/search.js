import { recipes } from "../recipes.js";
import { listTag } from "./listDisplay.js";
import recipeFactory from "./recipesDisplay.js";
import searchByTags from "./searchTag.js";
import createBoxTags from "./tagDisplay.js";

export default function globalSearch() {
  document.getElementById("search").addEventListener("input", (e) => {
    let searchInLowerCase = document.getElementById("search").value.toLowerCase();
    // all recipes card  if input value <= 2
    if (e.target.value.length <= 2) {
      const recipesCard = document.querySelectorAll(".article-recipes");
      if (recipesCard.length) {
        recipesCard.forEach((element) => {
          element.remove();
        });
      }
      // Display recipes
      resultCardRecipes(recipes);
    }
    // if input value >= 3
    if (e.target.value.length >= 3) {
      // remove all search items from their boxes
      document.querySelectorAll(".search-item").forEach((item) => {
        item.remove();
      });
      // search (filter + includes) input value -> recipes (name, description, ingredients, ustensils, appliance)
      let results = recipes.filter((obj) => {
        return (
          obj.name.toLowerCase().includes(searchInLowerCase) ||
          obj.description.toLowerCase().includes(searchInLowerCase) ||
          obj.ingredients.find((ingredient) => ingredient.ingredient.toLowerCase().includes(searchInLowerCase)) ||
          obj.ustensils.find((ustensils) => ustensils.toLowerCase().includes(searchInLowerCase)) ||
          obj.appliance.toLowerCase().includes(searchInLowerCase)
        );
      });
      resultCardRecipes(results);
      createBoxTags();
      tagFromSearch(results);
      searchByTags();
    }
  });
  // remove all cards
  document.querySelectorAll(".article-recipes").forEach((item) => {
    item.remove();
  });
  function resultCardRecipes(results) {
    // display none/block if results or not
    let MsgNoResult = document.querySelector("#no-results");
    if (results.length === 0) {
      MsgNoResult.style.display = "block";
    } else {
      MsgNoResult.style.display = "none";
    }
    // create new cards with the result
    let recipesContainer = document.getElementById("recipes");
    let recipeCardTemplate = "";
    results.forEach((recipe) => {
      let recipeModel = new recipeFactory(recipe, recipeCardTemplate);
      recipeCardTemplate = recipeModel.createCardRecipe();
    });
    recipesContainer.innerHTML = recipeCardTemplate;
  }
}
// update tag from search (ingredients-appliances-ustensils)
function tagFromSearch(results) {
  // remove all items from their list
  document.querySelectorAll(".search-item").forEach((item) => {
    item.remove();
  });
  // ingredients [] from results
  let ingredientsResult = [];
  let reducedIngredient = [];
  results.forEach((recipe) => {
    if (recipe.ingredients.length) {
      const ingredientsMapResult = recipe.ingredients.map((ingr) => ingr.ingredient.toLowerCase());
      ingredientsResult.push(...ingredientsMapResult);
      reducedIngredient = [...new Set(ingredientsResult)]; //remove duplicates
    }
  });
  //   add new list ingredients
  reducedIngredient.forEach((element) => {
    document.querySelector(".search-list-ingredients").append(listTag(element, "ingredients"));
  });
  // appliances [] from results
  let appliancesResult = [];
  let reducedAppliance = [];
  results.forEach((recipe) => {
    if (recipe.appliance.length) {
      const appliancesMapResult = recipe.appliance.toLowerCase();
      appliancesResult.push(appliancesMapResult);
      reducedAppliance = [...new Set(appliancesResult)]; //remove duplicates
    }
  });
  // add new list appliance
  reducedAppliance.forEach((element) => {
    document.querySelector(".search-list-appareils").append(listTag(element, "appliance"));
  });
  // ustensils [] from results
  let ustensilsResult = [];
  let reducedUstensils = [];
  results.forEach((recipe) => {
    if (recipe.ustensils.length) {
      recipe.ustensils.forEach((item) => {
        ustensilsResult.push(item.toLowerCase());
        reducedUstensils = [...new Set(ustensilsResult)]; //remove duplicates
      });
    }
  });
  // add new list ustensils
  reducedUstensils.forEach((element) => {
    document.querySelector(".search-list-ustensils").append(listTag(element, "ustensils"));
  });
  createBoxTags();
  searchByTags();
}

const inputSearch = document.getElementById("search");
globalSearch(inputSearch);
