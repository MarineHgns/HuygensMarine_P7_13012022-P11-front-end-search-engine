import { RecipesClean } from "./CleanData/formattingBuilder.js";
import { wordRemoved } from "./CleanData/wordRemoved.js";
import { recipes } from "../recipes.js";

let newTab = [];
let tabWords3 = [];
let tab1 = [];

let recipesCleaned = RecipesClean.clean(recipes);
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

newTabFinal.sort(setWords);

export { newTabFinal };
