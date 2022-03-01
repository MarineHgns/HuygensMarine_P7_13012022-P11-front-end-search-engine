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

let finalResult = [];
results.forEach((res) => {
  let id = res.id;
  res = !id ? recipes : recipes.filter((el) => el.id == id);
  finalResult.push(...res);
  return finalResult;
});

results = finalResult;

//////////////////
// Object for binary search
let newTab = [];
let tabWords3 = [];
let tab1 = [];

recipesCleaned.forEach((el) => {
  let tabWords = [el.name];
  let tabWords2 = el.description;

  tabWords3 = tabWords.concat(tabWords2);

  tabWords3 = tabWords3.toString();
  tabWords3 = wordRemoved(tabWords3);

  tab1 = [...new Set(tabWords3)];
  tab1 = tab1.sort();
  tab1 = tab1.slice(1);

  newTab.push({
    id: el.id,
    words: tab1,
  });
});

const newTabFinal = [];
newTab.map((myRecipe) => {
  myRecipe.words.map((myWord) => {
    const index = newTabFinal.findIndex((myNewTabFinal) => myNewTabFinal.word.toUpperCase() === myWord.toUpperCase());

    if (index === -1) {
      newTabFinal.push({
        word: myWord,
        id: [myRecipe.id],
      });
    } else {
      newTabFinal[index].id.push(myRecipe.id);
    }

    return myWord;
  });
  return myRecipe;
});

function setWords(a, b) {
  const wordA = a.word.toUpperCase();
  const wordB = b.word.toUpperCase();

  let comparaison = 0;
  if (wordA > wordB) {
    comparaison = 1;
  } else if (wordA < wordB) {
    comparaison = -1;
  }
  return comparaison;
}

newTabFinal.sort(setWords);

//// BINARY SEARCH

export default function binarySearch(arr, x) {
  let resultIndex = [];
  x = "coco".toUpperCase();
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
}

binarySearch();

///////////////////////////////////////////////
