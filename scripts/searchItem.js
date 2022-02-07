export default function filterTagsbyInputTag() {
  // ingredients
  let listIngredients = document.querySelectorAll(".search-item-ingredients");

  document
    .getElementById("search-ingredients")
    .addEventListener("input", (e) => {
      for (let ing of listIngredients) {
        let item = ing.innerHTML.toLowerCase();
        console.log(item);
        if (item.indexOf(e.target.value.toLowerCase()) == -1) {
          ing.style.display = "none";
        } else {
          ing.style.display = "";
        }
      }
    });

  // appliances
  let listAppliances = document.querySelectorAll(".search-item-appliance");

  document.getElementById("search-appareils").addEventListener("input", (e) => {
    for (let app of listAppliances) {
      let item = app.innerHTML.toLowerCase();
      if (item.indexOf(e.target.value.toLowerCase()) == -1) {
        app.style.display = "none";
      } else {
        app.style.display = "";
      }
    }
  });

  // ustensiles
  let listUstensiles = document.querySelectorAll(".search-item-ustensils");

  document.getElementById("search-ustensils").addEventListener("input", (e) => {
    for (let ust of listUstensiles) {
      let item = ust.innerHTML.toLowerCase();
      if (item.indexOf(e.target.value.toLowerCase()) == -1) {
        ust.style.display = "none";
      } else {
        ust.style.display = "";
      }
    }
  });
}
