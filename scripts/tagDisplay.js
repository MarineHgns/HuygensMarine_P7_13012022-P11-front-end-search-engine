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
