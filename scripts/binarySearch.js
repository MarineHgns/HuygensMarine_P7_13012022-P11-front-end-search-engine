import { RecipesClean } from "./CleanData/formattingBuilder.js";
import { wordRemoved } from "./CleanData/wordRemoved.js";
import { recipes } from "../recipes.js";

let tabRecipes = [];
let tabWords = [];
let tabElement = [];

let recipesCleaned = RecipesClean.clean(recipes);
recipesCleaned.forEach((el) => {
  let tabName = [el.name];
  let tabDesc = el.description;

  tabWords = tabName.concat(tabDesc);

  tabWords = tabWords.toString();
  tabWords = wordRemoved(tabWords);

  tabElement = [...new Set(tabWords)];
  tabElement = tabElement.sort();
  tabElement = tabElement.slice(1);

  tabRecipes.push({
    id: el.id,
    words: tabElement,
  });
});

const tabFinalRecipes = [];
tabRecipes.map((myRecipe) => {
  myRecipe.words.map((myWord) => {
    const index = tabFinalRecipes.findIndex((tabFinalRecipes) => tabFinalRecipes.word.toUpperCase() === myWord.toUpperCase());

    if (index === -1) {
      tabFinalRecipes.push({
        word: myWord,
        id: [myRecipe.id],
      });
    } else {
      tabFinalRecipes[index].id.push(myRecipe.id);
    }

    return myWord;
  });
  return myRecipe;
});

function setWords(a, b) {
  let wordA = a.word.toUpperCase();
  let wordB = b.word.toUpperCase();
  let comparaison = 0;

  if (wordA > wordB) {
    comparaison = 1;
  } else if (wordA < wordB) {
    comparaison = -1;
  }
  return comparaison;
}

tabFinalRecipes.sort(setWords);

export { tabFinalRecipes };
