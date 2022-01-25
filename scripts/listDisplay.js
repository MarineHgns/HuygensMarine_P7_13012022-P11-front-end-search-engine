import { recipes } from "../recipes.js";

// get elements (ingredients, appliances, ustensils)
export function elementsTag(recipes, elementTag) {
  let list = [];
  let listreduced = [];
  switch (elementTag) {
    case "ingredients":
      recipes.forEach((recipe) => {
        if (recipe.ingredients.length) {
          const ingredientsMap = recipe.ingredients.map((ingr) =>
            ingr.ingredient.toLowerCase()
          );
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
          const ustensilsMap = recipe.ustensils.map((ustensil) =>
            ustensil.toLowerCase()
          );

          list.push(...ustensilsMap);
        }
      });
      listreduced = [...new Set(list)];
      return listreduced;
  }
}

// // display element in the box
function listTag(item, element) {
  const wrapper = document.createElement("li");
  wrapper.innerText = item.charAt(0).toUpperCase() + item.slice(1);

  return wrapper;
}

// add element ingredient in his box
const ingredientsTags = elementsTag(recipes, "ingredients");

ingredientsTags.forEach((element) => {
  ingredientsTags.splice(30);
  let ingredientsBoxList = document.querySelector("#listIngredients");
  ingredientsBoxList.style.display = "block";
  const searchlistIngredients = document.querySelector("#listIngredients");
  const domIngredients = listTag(element, "ingredients");
  searchlistIngredients.append(domIngredients);
});

// add element appliance in his box
const applianceTags = elementsTag(recipes, "appliance");
applianceTags.forEach((element) => {
  let ingredientsBoxList = document.querySelector("#listAppareils");
  ingredientsBoxList.style.display = "block";
  const searchlistIngredients = document.querySelector("#listAppareils");
  const domAppliances = listTag(element, "appliance");
  searchlistIngredients.append(domAppliances);
});

// // add element ustensils in his box
const ustensilsTags = elementsTag(recipes, "ustensils");
ustensilsTags.forEach((element) => {
  let ingredientsBoxList = document.querySelector("#listUstensiles");
  ingredientsBoxList.style.display = "block";
  const searchlistIngredients = document.querySelector("#listUstensiles");
  const domAppliances = listTag(element, "appliance");
  searchlistIngredients.append(domAppliances);
});

// list + search display on mouseover
// ingredients
document.querySelector("#box-ingredients").addEventListener("mouseover", () => {
  document.querySelector("#search-ingredients").style.display = "block";
  document.querySelector("#listIngredients").style.display = "grid";
  document.querySelector(".list-ingredients").style.display = "none";
});

document
  .querySelector("#box-ingredients")
  .addEventListener("mouseleave", () => {
    document.querySelector("#search-ingredients").style.display = "none";
    document.querySelector("#listIngredients").style.display = "none";
    document.querySelector(".list-ingredients").style.display = "block";
  });

// appliances
document.querySelector("#box-appareils").addEventListener("mouseover", () => {
  document.querySelector("#search-appareils").style.display = "block";
  document.querySelector("#listAppareils").style.display = "grid";
  document.querySelector(".list-appareils").style.display = "none";
});

document.querySelector("#box-appareils").addEventListener("mouseleave", () => {
  document.querySelector("#search-appareils").style.display = "none";
  document.querySelector("#listAppareils").style.display = "none";
  document.querySelector(".list-appareils").style.display = "block";
});

// ustensils
document.querySelector("#box-ustensiles").addEventListener("mouseover", () => {
  document.querySelector("#search-ustensils").style.display = "block";
  document.querySelector("#listUstensiles").style.display = "grid";
  document.querySelector(".list-ustensiles").style.display = "none";
});

document.querySelector("#box-ustensiles").addEventListener("mouseleave", () => {
  document.querySelector("#search-ustensils").style.display = "none";
  document.querySelector("#listUstensiles").style.display = "none";
  document.querySelector(".list-ustensiles").style.display = "block";
});
