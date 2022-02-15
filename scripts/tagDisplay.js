import { recipes } from "../recipes.js";
import recipeFactory from "./recipesDisplay.js";
import searchByTags from "./searchTag.js";
import removeMiniTag from "./searchTag.js";

let listMiniTags = [];
export default function createBoxTags() {
  const miniTags = document.querySelector("#tagList");
  // ingredients
  const listItemIngredients = document.querySelectorAll(".search-item-ingredients");

  for (let i = 0; i < listItemIngredients.length; i++) {
    listItemIngredients[i].addEventListener("click", () => {
      listMiniTags.push(listItemIngredients[i]);
      miniTags.style.display = "block";
      listItemIngredients[i].style.display = "none";
      const tagBox = displayTag(listItemIngredients[i].innerText.toLowerCase(), "ingredients");
      tagBox.classList.add("tag-ingredient");
      miniTags.appendChild(tagBox);
      searchByTags("ingredients", listItemIngredients[i].innerText.toLowerCase());
      removeTag();
    });
  }

  //  appliances
  const listItemAppliances = document.querySelectorAll(".search-item-appliance");

  for (let i = 0; i < listItemAppliances.length; i++) {
    listItemAppliances[i].addEventListener("click", () => {
      listMiniTags.push(listItemAppliances[i]);
      miniTags.style.display = "block";
      const tagBox = displayTag(listItemAppliances[i].innerText.toLowerCase(), "appliance");
      tagBox.classList.add("tag-appliances");
      miniTags.appendChild(tagBox);
      searchByTags("appliance", listItemAppliances[i].innerText.toLowerCase());
      removeTag();
    });
  }

  // ustensils

  const listItemUstensils = document.querySelectorAll(".search-item-ustensils");

  for (let i = 0; i < listItemUstensils.length; i++) {
    listItemUstensils[i].addEventListener("click", () => {
      listMiniTags.push(listItemUstensils[i]);
      miniTags.style.display = "block";
      const tagBox = displayTag(listItemUstensils[i].innerText.toLowerCase(), "ustensils");
      tagBox.classList.add("tag-ustensils");
      miniTags.appendChild(tagBox);
      searchByTags("ustensils", listItemUstensils[i].innerText.toLowerCase());
      removeTag();
    });
  }
}

// Display Tag in his box
function displayTag(value, type) {
  const wrapper = document.createElement("button");
  wrapper.classList.add("tag-box");
  wrapper.setAttribute("type", "button");
  wrapper.setAttribute("datavalue", `${type}`);
  let tagCard = `
                  <span>${value}</span>
                  <i class="far fa-times-circle fa-lg close-tag"></i>
                `;
  wrapper.innerHTML = tagCard;
  return wrapper;
}

// // Remove tag when clicked on
function removeTag() {
  const removeTag = document.querySelectorAll(".tag-box");
  if (removeTag.length) {
    for (let x = 0; x < removeTag.length; x++)
      removeTag[x].addEventListener("click", () => {
        removeTag[x].remove();
        searchByTags();
        removeMiniTag();
        let removeTagList = document.querySelectorAll(".tag-box");
        if (removeTagList.length === 0) {
          let recipesContainer = document.getElementById("recipes");
          let recipeCardTemplate = "";
          recipes.forEach((recipe) => {
            let recipeModel = new recipeFactory(recipe, recipeCardTemplate);
            recipeCardTemplate = recipeModel.createCardRecipe();
          });
          recipesContainer.innerHTML = recipeCardTemplate;
        }
      });
  }
}
