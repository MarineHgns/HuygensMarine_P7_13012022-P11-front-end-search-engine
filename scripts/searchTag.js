import { recipes } from "../recipes.js";
import { listTag } from "./listDisplay.js";
import filterTagsbyInputTag from "./searchItem.js";
import tagDisplay from "./tagDisplay.js";
import RecipeDisplay from "./recipesDisplay.js";

let resultRecipesMiniTags = [];
let recipesRepetition = [];
let totalRecipesMiniTags = [];
let lastResultTotalMiniTags = [];
let totalMiniTags = [];
let listMiniTags;

export default function SearchTag(dataValue, value) {
  document.querySelectorAll(".search-item").forEach((item) => {
    item.remove();
  });

  let tagsSelected = document.querySelectorAll(".selected");
  let totalSelected = [];

  tagsSelected.forEach((tagsSelected) => {
    totalSelected.push(tagsSelected.innerText);
    listMiniTags = totalSelected;
    for (let i = 0; i < listMiniTags.length; i++) {
      totalMiniTags.push(
        ...[
          {
            datavalue: dataValue,
          },
        ]
      );
    }
  });

  function uniqueList(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }

  totalMiniTags = uniqueList(totalMiniTags, "datavalue");
  lastResultTotalMiniTags.push(...totalMiniTags);
  let valueLowCase = value;
  // const inputResearch = document.getElementById("search");
  // let researchToLowerCase = inputResearch.value.toLowerCase();

  if (totalSelected.length > 0) {
    switch (dataValue) {
      case "ingredients":
        resultRecipesMiniTags = recipes.filter((obj) => obj.ingredients.find((ingredient) => ingredient.ingredient.toLowerCase() === valueLowCase));
        recipesRepetition.push(...resultRecipesMiniTags);
        break;

      case "appliance":
        resultRecipesMiniTags = recipes.filter((obj) => obj.appliance.toLowerCase() === valueLowCase);
        recipesRepetition.push(...resultRecipesMiniTags);
        break;

      case "ustensils":
        resultRecipesMiniTags = recipes.filter((obj) => obj.ustensils.find((ustensil) => ustensil.toLowerCase() === valueLowCase));
        recipesRepetition.push(...resultRecipesMiniTags);
        break;
    }
    UpdateItemsFromMiniTags();
    filterTagsbyInputTag();
  }
}

// Create card recipes with the result or display "no results"
function createCardRecipesTags(results) {
  const MsgNoResults = document.querySelector("#no-results");
  if (results.length === 0) {
    MsgNoResults.style.display = "block";
  } else {
    MsgNoResults.style.display = "none";
  }
  results.forEach((recipe) => {
    RecipeDisplay.createCardRecipe(results);
  });
}

// for the first tag clicked and with recipe(s) result(s) -> sort list of tags

function UpdateItemsFromMiniTags() {
  lastResultTotalMiniTags = [...new Set(lastResultTotalMiniTags)];
  document.querySelectorAll(".search-item").forEach((item) => {
    item.remove();
  });

  let ingredientsResult = [];
  let reducedIngredient = [];
  resultRecipesMiniTags.forEach((recipe) => {
    console.log(resultRecipesMiniTags);
    if (recipe.ingredients.length) {
      const ingredientsMapResult = recipe.ingredients.map((ingr) => ingr.ingredient.toLowerCase());
      ingredientsResult.push(...ingredientsMapResult);
      reducedIngredient = [...new Set(ingredientsResult)];
    }
  });
  reducedIngredient.forEach((element) => {
    document.querySelector(".search-list-ingredients").append(listTag(element, "ingredients"));
  });
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
  tagDisplay.createBoxTags();
  createCardRecipesTags(totalRecipesMiniTags);
}
