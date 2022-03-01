import { recipes } from "../recipes.js";
import { listTag } from "./listDisplay.js";
import RecipeDisplay from "./recipesDisplay.js";
import filterTagsbyInputTag from "./searchItem.js";
import tagDisplay from "./tagDisplay.js";
import { RecipesClean } from "../scripts/CleanData/formattingBuilder.js";

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
      filterTagsbyInputTag();
    }
    // if input value >= 3
    if (e.target.value.length >= 3) {
      // remove all search items from their boxes
      document.querySelectorAll(".search-item").forEach((item) => {
        item.remove();
      });

      // search on cleaned recipes
      let recipesCleaned = RecipesClean.clean(recipes);
      // search (filter + includes) input value -> recipes (name, description, ingredients, ustensils, appliance)

      let results = recipesCleaned.filter((obj) => {
        return (
          obj.name.toLowerCase().includes(searchInLowerCase) ||
          obj.description.toLowerCase().includes(searchInLowerCase) ||
          obj.ingredientsString.toLowerCase().includes(searchInLowerCase)
        );
      });

      let finalResult = [];
      results.forEach((res) => {
        let id = res.id;
        res = !id ? recipes : recipes.filter((el) => el.id == id);
        finalResult.push(...res);
        return finalResult;
      });

      results = finalResult;

      resultCardRecipes(results);
      tagDisplay.createBoxTags();
      tagFromSearch(results);
      filterTagsbyInputTag();
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
    RecipeDisplay.createCardRecipe(results);
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
  tagDisplay.createBoxTags();
}

const inputSearch = document.getElementById("search");
globalSearch(inputSearch);
