import { recipes } from "../recipes.js";
let texte = `Rocher, rivage, arbres, plantes et fleurs, qui ne demandent qu'à vivre ici ou que tu m'emmèneras dîner quelque part. Eux ou d'autres moyens que par la traduction. Entendant le bruit des sabots des chevaux. Samedi soir, qu'il semble qu'1 fois, il est aisé d'en faire. Dès sa première enfance, de leurs joies d'amoureux lâchés en plein paradis des légendes. Belle voix, quelle absence d'idées ! Évidemment ; ils apercevaient des arbres, mêlé à une prodigieuse hauteur, et dans laquelle, entre 2 rangées d'arbres si maigres. Ruinée par l'abus même de la lumière électrique.
Gagnait-il de grosses sommes le lendemain, à 6 jours avant l'explosion de toutes les pensées mélancoliques (dont la clarté s'enfuit)`;

// console.log(
//   JSON.stringify(texte)
//     .toLowerCase()
//     .replace(/[^a-zA-ZÀ-ÿ' ]/g, "")
//     .normalize("NFD")
//     .replace(/\p{Diacritic}/gu, "")
//     .replace("'", " ")
//     .replace(/\s*\(.*?\)\s*/g, "")
//     .split(" ")
// );

// console.log(texte);

const dataCleaned = recipes.map((a) => ({
  id: a.id,
  ingredients: a.ingredients,
  time: a.time,
  description: a.description,
  ingredientsList: a.ingredients.map((a) => a.ingredient),
  ustensilsList: Array.isArray(a.ustensils) ? a.ustensils : a.ustensils.split(),
  appliancesList: Array.isArray(a.appliance) ? a.appliance : a.appliance.split(),
}));

dataCleaned.forEach(function (element) {
  // element.nameForSearch = cleanDataForSearch(element.name);
  element.ingredientsListForSearch = element.ingredientsList.map((a) => cleanDataForSearch(a));

  element.descriptionForSearch = cleanDataForSearch(element.description);
});

export { dataCleaned, cleanDataForSearch };

function cleanDataForSearch(string) {
  JSON.stringify(string);
  string.toLowerCase();
  // keep only letters, remove ponctuation and numbers
  string.replace(/[^a-zA-ZÀ-ÿ' ]/g, "");
  // replace accents
  string.normalize("NFD").replace(/\p{Diacritic}/gu, "");
  string.replace("'", " ");
  string.replace('"', " ");
  // remove text between parenthesis (ex thon rouge(ou blanc))
  string.replace(/\s*\(.*?\)\s*/g, "");
  removeShortWord(string, 3);
  string.split(" ");

  return string;
}

function removeShortWord(string, minLengthWord) {
  minLengthWord = 3;
  let stringWords = string.split(" ");
  stringWords = stringWords.filter(function (word) {
    return word.length >= minLengthWord;
  });
  return stringWords.join(" ");
}
