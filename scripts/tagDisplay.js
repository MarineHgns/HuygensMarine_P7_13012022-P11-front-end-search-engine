export default function createBoxTags() {
  // ingredients
  const listItemIngredients = document.querySelectorAll(
    ".search-item-ingredients"
  );

  let listTagIngredients = [];
  let tagIng = document.querySelector("#listTagIngredient");

  for (let i = 0; i < listItemIngredients.length; i++) {
    listItemIngredients[i].addEventListener("click", () => {
      listTagIngredients.push(listItemIngredients[i]);
      tagIng.style.display = "block";
      const tagBox = displayTag(listItemIngredients[i].innerHTML);
      tagBox.classList.add("tag-ingredient");
      tagIng.appendChild(tagBox);
      removeTag();
      console.log(listTagIngredients);
    });
  }

  //  appliances
  const listItemAppliances = document.querySelectorAll(
    ".search-item-appliance"
  );

  let listTagAppliances = [];
  let tagApp = document.querySelector("#listTagAppareil");

  for (let i = 0; i < listItemAppliances.length; i++) {
    listItemAppliances[i].addEventListener("click", () => {
      listTagAppliances.push(listItemAppliances[i]);
      tagApp.style.display = "block";
      const tagBox = displayTag(listItemAppliances[i].innerHTML);
      tagBox.classList.add("tag-appliances");
      tagApp.appendChild(tagBox);
      removeTag();
    });
  }

  // ustensils

  const listItemUstensils = document.querySelectorAll(".search-item-ustensils");

  let listTagUstensils = [];
  let tagUst = document.querySelector("#listTagUstensile");

  for (let i = 0; i < listItemUstensils.length; i++) {
    listItemUstensils[i].addEventListener("click", () => {
      listTagUstensils.push(listItemUstensils[i]);
      tagUst.style.display = "block";
      const tagBox = displayTag(listItemUstensils[i].innerHTML);
      tagBox.classList.add("tag-ustensils");
      tagUst.appendChild(tagBox);
      removeTag();
    });
  }
}

// Display Tag in his box
function displayTag(value) {
  const wrapper = document.createElement("span");
  wrapper.classList.add("tag-box");

  let tagCard = `
                  <span>${value}</span>
                  <i class="far fa-times-circle fa-lg close-tag"></i>
                `;
  wrapper.innerHTML = tagCard;
  return wrapper;
}

// Remove tag when clicked on
function removeTag() {
  const removeTag = document.querySelectorAll(".tag-box");
  if (removeTag.length) {
    for (let x = 0; x < removeTag.length; x++)
      removeTag[x].addEventListener("click", () => {
        removeTag[x].remove();
      });
  }
}
