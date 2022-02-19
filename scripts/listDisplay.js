import { recipes } from "../recipes.js";

// get elements [] (ingredients, appliances, ustensils)
export function elementsTag(recipes, elementTag) {
  let list = [];
  let listreduced = [];
  switch (elementTag) {
    case "ingredients":
      recipes.forEach((recipe) => {
        if (recipe.ingredients.length) {
          const ingredientsMap = recipe.ingredients.map((ingr) => ingr.ingredient.toLowerCase());
          list.push(...ingredientsMap);
        }
      });
      listreduced = [...new Set(list)];

      return listreduced;

    case "appliance":
      recipes.forEach((recipe) => {
        if (recipe.appliance.length) {
          const appliancesMap = recipe.appliance.toLowerCase();

          list.push(appliancesMap);
        }
      });
      listreduced = [...new Set(list)];

      return listreduced;

    case "ustensils":
      recipes.forEach((recipe) => {
        if (recipe.ustensils.length) {
          const ustensilsMap = recipe.ustensils.map((ustensil) => ustensil.toLowerCase());

          list.push(...ustensilsMap);
        }
      });
      listreduced = [...new Set(list)];
      return listreduced;
  }
}

//  display element in their box
export function listTag(item, element) {
  const wrapper = document.createElement("li");
  wrapper.classList.add(`search-item-${element}`);
  wrapper.classList.add(`search-item`);
  wrapper.innerText = item.charAt(0).toUpperCase() + item.slice(1);
  return wrapper;
}

export default function createListElements() {
  // add element ingredient in his box
  elementsTag(recipes, "ingredients").forEach((element) => {
    document.querySelector(".search-list-ingredients").append(listTag(element, "ingredients"));
  });

  // add element appliance in his box
  elementsTag(recipes, "appliance").forEach((element) => {
    document.querySelector(".search-list-appareils").append(listTag(element, "appliance"));
  });

  // add element ustensils in his box

  elementsTag(recipes, "ustensils").forEach((element) => {
    document.querySelector(".search-list-ustensils").append(listTag(element, "ustensils"));
  });
}

// list + search display/remove on mouseover
let i;
function tagListDisplay(selecteur, index) {
  document.querySelector(selecteur).addEventListener("mouseover", () => {
    i = index;
    document.querySelectorAll(".title")[i].style.display = "none";
    document.querySelectorAll(".list")[i].style.display = "grid";
    document.querySelectorAll(".search")[i].style.display = "block";
    document.querySelectorAll(".fa-chevron-down")[i].style.transform = "rotate(180deg)";
  });
}

tagListDisplay("#box-ingredients", 0);
tagListDisplay("#box-appareils", 1);
tagListDisplay("#box-ustensiles", 2);

// list + search display/remove on mouseleave
function tagListRemove(selecteur, index) {
  document.querySelector(selecteur).addEventListener("mouseleave", () => {
    i = index;
    document.querySelectorAll(".hide")[i].style.display = "none";
    document.querySelectorAll(".list")[i].style.display = "none";
    document.querySelectorAll(".title")[i].style.display = "block";
    document.querySelectorAll(".fa-chevron-down")[i].style.transform = "rotate(0deg)";
  });
}

tagListRemove("#box-ingredients", 0);
tagListRemove("#box-appareils", 1);
tagListRemove("#box-ustensiles", 2);
