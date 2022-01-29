import { recipes } from "../recipes.js";
import createCardRecipe from "../scripts/recipesDisplay.js";
import recipeCardTemplate from "../scripts/recipesDisplay.js";
import recipeFactory from "./recipesDisplay.js";

export default function JumpSearchList() {
  let searchInput = document.querySelector("#search");
  searchInput.addEventListener("input", filterData);
  // console.log(recipes);
  function filterData(e) {
    let recipesBox = document.querySelector("#recipes");
    recipesBox.innerHTML = "";
    const searchedString = e.target.value.toLowerCase();

    const filteredArr = recipes.filter(
      (el) =>
        el.name.toLowerCase().includes(searchedString) ||
        el.description.toLowerCase().includes(searchedString) ||
        el.appliance.toLowerCase().includes(searchedString)
    );

    // new recipeFactory(recipes, recipeCardTemplate).createCardRecipe(
    //   filteredArr
    // );
  }
}

JumpSearchList();
