import { recipes } from "../recipes.js";
import { listTag } from "./listDisplay.js";
import filterTagsbyInputTag from "./searchItem.js";
import displayTag from "./tagDisplay.js";
import recipeFactory from "./recipesDisplay.js";
import createBoxTags from "./tagDisplay.js";

let resultRecipesMiniTags = [];
let recipesRepetition = [];
let totalRecipesMiniTags = [];
let lastResultTotalMiniTags = [];
let totalMiniTags = [];
let listMiniTags = [];

let listItemIngredients = document.querySelectorAll(".search-item-ingredients");
for (let i = 0; i < listItemIngredients.length; i++) {
  listItemIngredients[i].addEventListener("click", () => {
    listMiniTags.push(listItemIngredients[i]);
    displayTag(listItemIngredients[i].innerText.toLowerCase(), "ingredients");
  });
}

let listItemAppliances = document.querySelectorAll(".search-item-appliance");
for (let i = 0; i < listItemAppliances.length; i++) {
  listItemAppliances[i].addEventListener("click", () => {
    listMiniTags.push(listItemAppliances[i]);
    displayTag(listItemAppliances[i].innerText.toLowerCase(), "appliance");
  });
}

let listItemUstensils = document.querySelectorAll(".search-item-ustensils");
for (let i = 0; i < listItemUstensils.length; i++) {
  listItemUstensils[i].addEventListener("click", () => {
    listMiniTags.push(listItemUstensils[i]);
    displayTag(listItemUstensils[i].innerText.toLowerCase(), "ustensils");
  });
}

export default function searchByTags(dataValue, value) {
  for (let i = 0; i < listMiniTags.length; i++) {
    totalMiniTags.push(
      ...[
        {
          datavalue: dataValue,
          value: listMiniTags[i].innerText.toLowerCase(),
        },
      ]
    );
  }

  function uniqueList(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }

  totalMiniTags = uniqueList(totalMiniTags, "datavalue");
  lastResultTotalMiniTags.push(...totalMiniTags);

  let valueLowCase = value;
  if (lastResultTotalMiniTags.length >= 1) {
    switch (dataValue) {
      case "ingredients":
        resultRecipesMiniTags = recipes.filter((obj) => obj.ingredients.find((ingredient) => ingredient.ingredient.toLowerCase() === valueLowCase));
        recipesRepetition.push(...resultRecipesMiniTags);

        UpdateItemsFromMiniTags();
        filterTagsbyInputTag();
        break;

      case "appliance":
        resultRecipesMiniTags = recipes.filter((obj) => obj.appliance.toLowerCase() === valueLowCase);
        recipesRepetition.push(...resultRecipesMiniTags);

        UpdateItemsFromMiniTags();
        filterTagsbyInputTag();
        break;

      case "ustensils":
        resultRecipesMiniTags = recipes.filter((obj) => obj.ustensils.find((ustensil) => ustensil.toLowerCase() === valueLowCase));
        recipesRepetition.push(...resultRecipesMiniTags);
        UpdateItemsFromMiniTags();
        filterTagsbyInputTag();

        break;
    }
  } else if (totalMiniTags.length === 0) {
    removeElementsFromListItems();
    UpdateItemsFromMiniTags();
  }
}

function createCardRecipesTags(results) {
  const MsgNoResults = document.querySelector("#no-results");
  if (results.length === 0) {
    MsgNoResults.style.display = "block";
  } else {
    MsgNoResults.style.display = "none";
  }

  let recipesContainer = document.getElementById("recipes");
  let recipeCardTemplate = "";
  results.forEach((recipe) => {
    let recipeModel = new recipeFactory(recipe, recipeCardTemplate);
    recipeCardTemplate = recipeModel.createCardRecipe();
  });
  recipesContainer.innerHTML = recipeCardTemplate;
}

function removeElementsFromListItems() {
  lastResultTotalMiniTags = [...new Set(lastResultTotalMiniTags)];
  const listAllItems = document.querySelectorAll(".search-item");
  for (let i = 0; i < listAllItems.length; i++) {
    for (let j = 0; j < listMiniTags.length; j++) {
      if (listAllItems[i].innerText === listMiniTags[j].innerText) {
        listAllItems[i].remove();
      }
    }
  }
}

function UpdateItemsFromMiniTags() {
  document.querySelectorAll(".search-item").forEach((item) => {
    item.remove();
  });

  let ingredientsResult = [];
  let reducedIngredient = [];
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

  totalRecipesMiniTags = [...new Set(recipesRepetition)];
  removeElementsFromListItems();
  createBoxTags();
  createCardRecipesTags(totalRecipesMiniTags);
}
