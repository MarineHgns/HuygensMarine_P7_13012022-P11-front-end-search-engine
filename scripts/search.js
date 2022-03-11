import { recipes } from "../recipes.js";
import { listTag } from "./listDisplay.js";
import RecipeDisplay from "./recipesDisplay.js";
import filterTagsbyInputTag from "./searchItem.js";
import tagDisplay from "./tagDisplay.js";
import { tabFinalRecipes } from "./binarySearch.js";

let tagsSelected = [];
let totalSelected = [];
let inputValue = [];
let results = [];
let resultFinal = [];
let resultRecipesMiniTags = [];
let lastResultTotalMiniTags = [];
let totalMiniTags = [];
let listMiniTags;
let resultsTag = [];
let valueLowCase = [];
let stockTag = [];

export default function search(dataValue, value) {
  tagsSelected = document.querySelectorAll(".selected");
  inputValue = document.getElementById("search").value.toLowerCase();

  if ((tagsSelected.length == 0 && inputValue.length == 0) || (tagsSelected.length == 0 && inputValue.length <= 2)) {
    results = [];
    results = recipes;
    UpdateItemsList(results);
    resultCardRecipes(results);
  }

  if (tagsSelected.length == 1 && inputValue.length == 0) {
    deleteItem();

    tagsSelected = document.querySelectorAll(".selected");
    tagsSelected.forEach((tagsSelected) => {
      totalSelected.push(tagsSelected.innerText);

      for (let i = 0; i < totalSelected.length; i++) {
        totalMiniTags.push(
          ...[
            {
              datavalue: dataValue,
            },
          ]
        );
      }
    });

    totalMiniTags = uniqueList(totalMiniTags, "datavalue");
    stockTag = uniqueList(totalMiniTags, "datavalue");
    lastResultTotalMiniTags.push(...totalMiniTags);
    valueLowCase = value;
    stockTag.push({ value: valueLowCase });

    if (totalSelected.length > 0) {
      switch (dataValue) {
        case "ingredients":
          resultRecipesMiniTags = recipes.filter((obj) => obj.ingredients.find((ingredient) => ingredient.ingredient.toLowerCase() === valueLowCase));
          resultFinal.push(...resultRecipesMiniTags);
          break;

        case "appliance":
          resultRecipesMiniTags = recipes.filter((obj) => obj.appliance.toLowerCase() === valueLowCase);
          resultFinal.push(...resultRecipesMiniTags);
          break;

        case "ustensils":
          resultRecipesMiniTags = recipes.filter((obj) => obj.ustensils.find((ustensil) => ustensil.toLowerCase() === valueLowCase));
          resultFinal.push(...resultRecipesMiniTags);
          break;
      }

      results = [...new Set(resultFinal)];
    }
    UpdateItemsList(results);
    resultCardRecipes(results);
  }

  if (tagsSelected.length >= 2 && inputValue.length == 0) {
    deleteItem();
    totalSelected = [];
    tagsSelected = [];

    tagsSelected = document.querySelectorAll(".selected");

    tagsSelected.forEach((tagsSelected) => {
      totalSelected.push(tagsSelected.innerText);
      for (let i = 0; i < totalSelected.length; i++) {
        totalMiniTags.push(
          ...[
            {
              datavalue: dataValue,
            },
          ]
        );
      }
    });

    totalMiniTags = uniqueList(totalMiniTags, "datavalue");
    valueLowCase = value;

    resultRecipesMiniTags = results.filter(
      (obj) =>
        obj.ingredients.find((ingredient) => ingredient.ingredient.toLowerCase() === valueLowCase) ||
        obj.appliance.toLowerCase() === valueLowCase ||
        obj.ustensils.find((ustensil) => ustensil.toLowerCase() === valueLowCase)
    );

    results = [];
    resultFinal = [];
    resultFinal.push(...resultRecipesMiniTags);
    results = [...new Set(resultFinal)];

    resultCardRecipes(results);
    UpdateItemsList(results);
  }

  if ((tagsSelected.length >= 1 && inputValue.length == 2) || (tagsSelected.length >= 1 && inputValue.length == 1)) {
    totalSelected = [];
    deleteItem();
    stockTag.forEach((el) => {
      totalSelected.push(el.value);
      for (let i = 0; i < totalSelected.length; i++) {
        totalMiniTags.push(
          ...[
            {
              datavalue: dataValue,
            },
          ]
        );
      }
    });

    totalMiniTags = uniqueList(totalMiniTags, "datavalue");

    valueLowCase = [];
    stockTag.forEach((el) => {
      valueLowCase = el.value;
    });

    resultRecipesMiniTags = recipes.filter(
      (obj) =>
        obj.ingredients.find((ingredient) => ingredient.ingredient.toLowerCase() === valueLowCase) ||
        obj.appliance.toLowerCase() === valueLowCase ||
        obj.ustensils.find((ustensil) => ustensil.toLowerCase() === valueLowCase)
    );

    resultFinal.push(...resultRecipesMiniTags);
    results = [...new Set(resultFinal)];

    UpdateItemsList(results);
    resultCardRecipes(results);
  }

  if (tagsSelected.length == 0 && inputValue.length >= 3) {
    deleteItem();

    let resultIndex = [];
    let x = inputValue.toUpperCase();
    console.log(x);
    var startIndex = 0,
      stopIndex = tabFinalRecipes.length - 1,
      middle = Math.floor((stopIndex + startIndex) / 2);

    while (tabFinalRecipes[middle].word.indexOf(x) !== 0 && startIndex < stopIndex) {
      resultIndex = [];
      if (x < tabFinalRecipes[middle].word) {
        stopIndex = middle - 1;
      } else if (x > tabFinalRecipes[middle].word) {
        startIndex = middle + 1;
      } else if (stopIndex >= startIndex) {
      }

      middle = Math.floor((stopIndex + startIndex) / 2);
      resultIndex = tabFinalRecipes[middle].word.indexOf(x) !== 0 ? -1 : middle;
    }

    let finalResult = [];
    let results = [];

    if (resultIndex >= 0) {
      let tabResult = [];

      if (resultIndex >= 0) {
        for (let i = resultIndex + 1; tabFinalRecipes[i].word.includes(x); i++) {
          tabResult.push([i]);
        }
      }

      if (resultIndex >= 0 && tabFinalRecipes[resultIndex - 1].word.includes(x)) {
        tabResult.push([resultIndex - 1]);
      }

      tabResult.push([tabFinalRecipes[middle].word.indexOf(x) !== 0 ? -1 : middle]);

      tabResult.map((e) => {
        let tabTab = tabFinalRecipes[e].id;
        tabTab.forEach((res) => {
          res = !res ? recipes : recipes.filter((el) => el.id == res);
          finalResult.push(...res);
          finalResult = [...new Set(finalResult)];
          return finalResult;
        });
      });

      results = finalResult;
    } else if (resultIndex <= -1) {
      results = finalResult;
    }

    finalResult = [];
    results.forEach((res) => {
      let id = res.id;
      res = !id ? recipes : recipes.filter((el) => el.id == id);
      finalResult.push(...res);
      return finalResult;
    });

    results = finalResult;
    UpdateItemsList(results);
    results = [...new Set(results)];
    resultCardRecipes(results);
  }

  if (tagsSelected.length >= 1 && inputValue.length >= 3) {
    resultFinal = [];
    deleteItem();

    let resultsInput = results.filter((obj) => {
      return (
        obj.name.toLowerCase().includes(inputValue) ||
        obj.description.toLowerCase().includes(inputValue) ||
        obj.ingredients.find((ingredient) => ingredient.ingredient.toLowerCase().includes(inputValue)) ||
        obj.ustensils.find((ustensils) => ustensils.toLowerCase().includes(inputValue)) ||
        obj.appliance.toLowerCase().includes(inputValue)
      );
    });

    totalSelected = [];
    tagsSelected = [];
    tagsSelected = document.querySelectorAll(".selected");

    tagsSelected.forEach((tagsSelected) => {
      totalSelected.push(tagsSelected.innerText);
      for (let i = 0; i < totalSelected.length; i++) {
        totalMiniTags.push(
          ...[
            {
              datavalue: dataValue,
            },
          ]
        );
      }
    });

    totalMiniTags = uniqueList(totalMiniTags, "datavalue");
    lastResultTotalMiniTags.push(...totalMiniTags);
    valueLowCase = value;

    if (totalSelected.length > 0) {
      switch (dataValue) {
        case "ingredients":
          resultRecipesMiniTags = resultsInput.filter((obj) =>
            obj.ingredients.find((ingredient) => ingredient.ingredient.toLowerCase() === valueLowCase)
          );
          resultFinal.push(...resultRecipesMiniTags);
          break;

        case "appliance":
          resultRecipesMiniTags = resultsInput.filter((obj) => obj.appliance.toLowerCase() === valueLowCase);
          resultFinal.push(...resultRecipesMiniTags);
          break;

        case "ustensils":
          resultRecipesMiniTags = resultsInput.filter((obj) => obj.ustensils.find((ustensil) => ustensil.toLowerCase() === valueLowCase));
          resultFinal.push(...resultRecipesMiniTags);
          break;
      }

      resultsTag = [...new Set(resultFinal)];
    }

    results = [];
    results.push(...resultsTag);

    UpdateItemsList(results);
    results = [...new Set(results)];
    resultCardRecipes(results);
  }

  tagDisplay.createBoxTags();
  filterTagsbyInputTag();
}

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

export function UpdateItemsList(results) {
  deleteItem();

  let ingredientsResult = [];
  let reducedIngredient = [];
  results.forEach((recipe) => {
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
  results.forEach((recipe) => {
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
  results.forEach((recipe) => {
    if (recipe.ustensils.length) {
      const ustensilsMapResult = recipe.ustensils;
      ustensilsResult.push(...ustensilsMapResult);
      reducedUstensils = [...new Set(ustensilsResult)];
    }
  });
  reducedUstensils.forEach((element) => {
    document.querySelector(".search-list-ustensils").append(listTag(element, "ustensils"));
  });
}

export function updateAfterTagRemoved(dataValue) {
  totalSelected = [];
  tagsSelected = [];

  deleteItem();

  tagsSelected = document.querySelectorAll(".selected");
  tagsSelected.forEach((tagsSelected) => {
    let tags = tagsSelected.innerText.toLowerCase().split(" ");
    tags.splice(1);

    totalSelected.push(tags);

    for (let i = 0; i < totalSelected.length; i++) {
      totalMiniTags.push(
        ...[
          {
            datavalue: dataValue,
          },
        ]
      );
    }
  });

  totalMiniTags = uniqueList(totalMiniTags, "datavalue");

  valueLowCase = totalSelected;

  resultRecipesMiniTags = recipes.filter(
    (obj) =>
      obj.ingredients.find((ingredient) => ingredient.ingredient.toLowerCase().includes(valueLowCase)) ||
      obj.appliance.toLowerCase() === valueLowCase ||
      obj.ustensils.find((ustensil) => ustensil.toLowerCase() === valueLowCase)
  );

  resultFinal = [];
  resultFinal.push(...resultRecipesMiniTags);

  results = [];
  results = [...new Set(resultFinal)];

  resultCardRecipes(results);
  UpdateItemsList(results);
}

function deleteItem() {
  document.querySelectorAll(".search-item").forEach((item) => {
    item.remove();
  });
}

function uniqueList(arr, key) {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
}
