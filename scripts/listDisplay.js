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
  wrapper.classList.add(`search-item-${element}`);
  wrapper.innerText = item.charAt(0).toUpperCase() + item.slice(1);
  return wrapper;
}

// add element ingredient in his box

elementsTag(recipes, "ingredients").forEach((element) => {
  document
    .querySelector("#listIngredients")
    .append(listTag(element, "ingredients"));
});

// add element appliance in his box
elementsTag(recipes, "appliance").forEach((element) => {
  document
    .querySelector("#listAppareils")
    .append(listTag(element, "appliance"));
});

// add element ustensils in his box
elementsTag(recipes, "ustensils").forEach((element) => {
  document
    .querySelector("#listUstensiles")
    .append(listTag(element, "ustensils"));
});

// list + search display/remove on mouseover

let i;
function tagListDisplay() {
  document.querySelectorAll(".title")[i].style.display = "none";
  document.querySelectorAll(".list")[i].style.display = "grid";
  document.querySelectorAll(".search")[i].style.display = "block";
  document.querySelectorAll(".fa-chevron-down")[i].style.transform =
    "rotate(180deg)";
}

function tagListRemove() {
  document.querySelectorAll(".hide")[i].style.display = "none";
  document.querySelectorAll(".list")[i].style.display = "none";
  document.querySelectorAll(".title")[i].style.display = "block";
  document.querySelectorAll(".fa-chevron-down")[i].style.transform =
    "rotate(0deg)";
}

// ingredients
// display
document.querySelector("#box-ingredients").addEventListener("mouseover", () => {
  i = 0;
  tagListDisplay();
});

// remove
document
  .querySelector("#box-ingredients")
  .addEventListener("mouseleave", () => {
    i = 0;
    tagListRemove();
  });

// appliances
// display
document.querySelector("#box-appareils").addEventListener("mouseover", () => {
  i = 1;
  tagListDisplay();
});

// remove
document.querySelector("#box-appareils").addEventListener("mouseleave", () => {
  i = 1;
  tagListRemove();
});

// ustensils
// display
document.querySelector("#box-ustensiles").addEventListener("mouseover", () => {
  i = 2;
  tagListDisplay();
});

// remove
document.querySelector("#box-ustensiles").addEventListener("mouseleave", () => {
  i = 2;
  tagListRemove();
});

// export default function filterIngredient() {
//   let searchInput = document.querySelector("#search-ingredients");
//   searchInput.addEventListener("input", filterData);
//   // console.log(ingredientsTags);
//   function filterData(e) {
//     // let ingList = document.querySelector("#recipes");
//     // ingBox.innerHTML = "";

//     const searchedString = e.target.value.toLowerCase();

//     const filteredArr = ingredientsTags.filter((el) =>
//       el.toLowerCase().includes(searchedString)
//     );
//     // console.log(filteredArr);
//   }
// }

// filterIngredient();
