import { formattingData } from "./formattingData.js";

// sentence -> array of words
export function wordRemoved(sentence) {
  var wordTab = [];
  let format = formattingData(sentence);
  wordTab = format.split(" ");

  //delete some words from wordTab
  for (let i = 0; i < wordTab.length; i++) {
    switch (wordTab[i]) {
      case "DANS":
        wordTab.splice(i, 1);
        i -= 1;
        break;
      case "DES":
        wordTab.splice(i, 1);
        i -= 1;
        break;
      case "DE":
        wordTab.splice(i, 1);
        i -= 1;
        break;

      case "LE":
        wordTab.splice(i, 1);
        i -= 1;
        break;

      case "LA":
        wordTab.splice(i, 1);
        i -= 1;
        break;

      case "ET":
        wordTab.splice(i, 1);
        i -= 1;
        break;

      case "L'":
        wordTab.splice(i, 1);
        i -= 1;
        break;

      case "D'":
        wordTab.splice(i, 1);
        i -= 1;
        break;
      case "A":
        wordTab.splice(i, 1);
        i -= 1;
        break;

      case "AU":
        wordTab.splice(i, 1);
        i -= 1;
        break;
      case "AUX":
        wordTab.splice(i, 1);
        i -= 1;
      case "EN":
        wordTab.splice(i, 1);
        i -= 1;
        break;
      case "OU":
        wordTab.splice(i, 1);
        i -= 1;
        break;
      case "LES":
        wordTab.splice(i, 1);
        i -= 1;
        break;
      case "POUR":
        wordTab.splice(i, 1);
        i -= 1;
        break;
      case "UN":
        wordTab.splice(i, 1);
        i -= 1;
        break;
      case "AVEC":
        wordTab.splice(i, 1);
        i -= 1;
        break;
      case "VOUS":
        wordTab.splice(i, 1);
        i -= 1;
        break;
      case "PAR":
        wordTab.splice(i, 1);
        i -= 1;
        break;
      case "PAS":
        wordTab.splice(i, 1);
        i -= 1;
        break;
      case "QUE":
        wordTab.splice(i, 1);
        i -= 1;
        break;
      case "FOIS":
        wordTab.splice(i, 1);
        i -= 1;
        break;
      case "EST":
        wordTab.splice(i, 1);
        i -= 1;
        break;
      case "TOUT":
        wordTab.splice(i, 1);
        i -= 1;
        break;
      case "UNE":
        wordTab.splice(i, 1);
        i -= 1;
        break;
      case "TOUS":
        wordTab.splice(i, 1);
        i -= 1;
        break;
      case "AVOIR":
        wordTab.splice(i, 1);
        i -= 1;
        break;
      case "EST":
        wordTab.splice(i, 1);
        i -= 1;
        break;
      case "AJOUTER":
        wordTab.splice(i, 1);
        i -= 1;
        break;
      case "SI":
        wordTab.splice(i, 1);
        i -= 1;
        break;
      case "CI":
        wordTab.splice(i, 1);
        i -= 1;
        break;
      case "DU":
        wordTab.splice(i, 1);
        i -= 1;
        break;
      case "AINSI":
        wordTab.splice(i, 1);
        i -= 1;
        break;
      case "C":
        wordTab.splice(i, 1);
        i -= 1;
        break;
      case "CE":
        wordTab.splice(i, 1);
        i -= 1;
        break;
      case "CETTE ":
        wordTab.splice(i, 1);
        i -= 1;
        break;
      case "CL":
        wordTab.splice(i, 1);
        i -= 1;
        break;
      case "0":
        wordTab.splice(i, 1);
        i -= 1;
        break;
      case "25":
        wordTab.splice(i, 1);
        i -= 1;
        break;
      case "5":
        wordTab.splice(i, 1);
        i -= 1;
        break;
      case "80":
        wordTab.splice(i, 1);
        i -= 1;
        break;
      case "ALORS":
        wordTab.splice(i, 1);
        i -= 1;
        break;
      case "AFIN":
        wordTab.splice(i, 1);
        i -= 1;
        break;
      default:
        break;
    }
  }

  return wordTab;
}
