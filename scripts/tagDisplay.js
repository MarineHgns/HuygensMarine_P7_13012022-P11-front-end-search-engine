// import globalSearch from "./search.js";
// import SearchTag from "./searchTag.js";
// import UpdateAfterRemoveTag from "./UpdateAfterRemoveTag.js";

import search, { updateAfterTagRemoved } from "./search.js";
import { UpdateItemsList } from "./search.js";

export default class tagDisplay {
  static createBoxTags() {
    const miniTags = document.querySelector("#tagList");

    // ingredients
    const listItemIngredients = document.querySelectorAll(".search-item-ingredients");

    for (let i = 0; i < listItemIngredients.length; i++) {
      listItemIngredients[i].addEventListener("click", () => {
        miniTags.style.display = "block";
        listItemIngredients[i].style.display = "none";
        const tagBox = new displayTag(listItemIngredients[i].innerText, "ingredients");
        tagBox.classList.add("tag-ingredient");
        miniTags.appendChild(tagBox);
        tagBox.classList.add("selected");
        search("ingredients", listItemIngredients[i].innerText.toLowerCase());
        removeTag();
      });
    }

    //  appliances
    const listItemAppliances = document.querySelectorAll(".search-item-appliance");

    for (let i = 0; i < listItemAppliances.length; i++) {
      listItemAppliances[i].addEventListener("click", () => {
        miniTags.style.display = "block";
        const tagBox = displayTag(listItemAppliances[i].innerText, "appliance");
        tagBox.classList.add("tag-appliances");
        miniTags.appendChild(tagBox);
        tagBox.classList.add("selected");
        search("appliance", listItemAppliances[i].innerText.toLowerCase());
        removeTag();
      });
    }

    // ustensils

    const listItemUstensils = document.querySelectorAll(".search-item-ustensils");

    for (let i = 0; i < listItemUstensils.length; i++) {
      listItemUstensils[i].addEventListener("click", () => {
        miniTags.style.display = "block";
        const tagBox = displayTag(listItemUstensils[i].innerText, "ustensils");
        tagBox.classList.add("tag-ustensils");
        miniTags.appendChild(tagBox);
        tagBox.classList.add("selected");
        search("ustensils", listItemUstensils[i].innerText.toLowerCase());
        removeTag();
      });
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

    // remove tag when clicked on and remove class "selected"
    function removeTag() {
      const removeTag = document.querySelectorAll(".tag-box");
      if (removeTag.length) {
        for (let x = 0; x < removeTag.length; x++)
          removeTag[x].addEventListener("click", () => {
            removeTag[x].classList.remove("selected");
            removeTag[x].remove();
            updateAfterTagRemoved();

            if (document.querySelectorAll(".tag-box").length == 0) {
              search();
            }
          });
      }
    }
  }
}
