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
      default:
        break;
    }
  }

  return wordTab;
}
