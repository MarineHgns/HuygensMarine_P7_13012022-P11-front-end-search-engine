import { recipes } from "../recipes.js";
import { listTag } from "./listDisplay.js";
import RecipeDisplay from "./recipesDisplay.js";
import filterTagsbyInputTag from "./searchItem.js";
import tagDisplay from "./tagDisplay.js";
import { newTabFinal } from "./binarySearch.js";

export default function globalSearch() {
  document.getElementById("search").addEventListener("input", (e) => {
    let search = document.getElementById("search").value.toUpperCase();
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

      let resultIndex = [];
      let x = search;
      var startIndex = 0,
        stopIndex = newTabFinal.length - 1,
        middle = Math.floor((stopIndex + startIndex) / 2);

      while (newTabFinal[middle].word.indexOf(x) !== 0 && startIndex < stopIndex) {
        resultIndex = [];
        if (x < newTabFinal[middle].word) {
          stopIndex = middle - 1;
        } else if (x > newTabFinal[middle].word) {
          startIndex = middle + 1;
        } else if (stopIndex >= startIndex) {
        }

        middle = Math.floor((stopIndex + startIndex) / 2);
        resultIndex = newTabFinal[middle].word.indexOf(x) !== 0 ? -1 : middle;
      }

      let finalResult = [];
      let results = [];

      if (resultIndex >= 0) {
        let resultIndexWordAfter = newTabFinal[resultIndex + 1].word;
        let resultIndexWordPrevious = newTabFinal[resultIndex - 1].word;
        let tabResult = [];
        let tabTab = [];

        if (resultIndex >= 0 && resultIndexWordAfter.includes(x)) {
          tabResult.push([resultIndex + 1]);
          if (resultIndex >= 0 && resultIndexWordPrevious.includes(x)) {
            tabResult.push([resultIndex - 1]);
          }
        }

        tabResult.push([newTabFinal[middle].word.indexOf(x) !== 0 ? -1 : middle]);

        tabResult.map((e) => {
          tabTab = newTabFinal[e].id;
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
        console.log("no results");
      }

      finalResult = [];
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
