import RecipesClean from "../scripts/CleanData/formattingBuilder.js";
import { wordRemoved } from "../scripts/CleanData/wordRemoved.js";
import { recipes } from "../recipes.js";

/////// SEARCH ALGO

const inputValueTest = "jus de citron ";

let results = recipes.filter((obj) => {
  return (
    obj.name.toLowerCase().includes(inputValueTest) ||
    obj.description.toLowerCase().includes(inputValueTest) ||
    obj.ingredients.find((ingredient) => ingredient.ingredient.toLowerCase().includes(inputValueTest))
  );
});

//// SEARCH WITH CLEANED DATA

let recipesCleaned = RecipesClean.clean(recipes);

results = recipesCleaned.filter((obj) => {
  return (
    obj.name.toLowerCase().includes(inputValueTest) ||
    obj.description.toLowerCase().includes(inputValueTest) ||
    obj.ingredientsString.toLowerCase().includes(inputValueTest)
  );
});

//////////////////
// Object for binary search

let tabFinal = [];
let tabFinalResult = [];
let newTab = [];
let tabTab = [];
let tabWords3 = [];
let tabTab4 = [];
let tabTab5 = [];
let tabTab6 = [];

recipesCleaned.forEach((el) => {
  let tabWords = [el.name];
  let tabWords2 = el.description;

  tabWords3 = tabWords.concat(tabWords2);

  tabWords3 = tabWords3.toString();
  tabWords3 = wordRemoved(tabWords3);

  tabFinal = [...new Set(tabWords3)];
  tabFinal = tabFinal.sort();
  tabFinal = tabFinal.slice(1);

  newTab.push({
    id: el.id,
    words: tabFinal,
  });

  newTab.forEach((el) => {
    tabFinal.forEach((ele) => {
      tabFinalResult.push(ele);
    });

    tabTab = [...new Set(tabFinalResult)];
    tabTab = tabTab.sort();

    tabTab.forEach((el) => {
      tabTab4 = [...new Set(tabTab)];
    });
  });
});

// console.log(tabTab4);

tabTab4.forEach((ele) => {
  // console.log(ele);
  tabTab5 = newTab.filter((obj) => {
    return obj.words.includes(ele);
  });

  let id = [];

  tabTab5.forEach((el) => {
    id = el.id;
    tabTab6.push({
      element: ele,
      id: id,
    });
  });
});
// console.log(tabTab6);

//// BINARY SEARCH

export default function binarySearch(arr, x) {
  x = "affaire".toUpperCase();
  arr = "";
  var startIndex = 0,
    stopIndex = arr.length - 1,
    middle = Math.floor((stopIndex + startIndex) / 2);

  while (arr[middle] != x && startIndex < stopIndex) {
    if (x < arr[middle]) {
      stopIndex = middle - 1;
    } else if (x > arr[middle]) {
      startIndex = middle + 1;
    }

    middle = Math.floor((stopIndex + startIndex) / 2);
  }

  return arr[middle] != x ? -1 : middle;
}

let result = binarySearch();
// if (result == -1) console.log("Element non trouvé");
// else console.log("Element trouvé à l'" + "index " + result);

////////////
