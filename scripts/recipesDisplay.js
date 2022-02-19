export default class RecipeDisplay {
  static createCardRecipe(result) {
    let recipesContainer = document.getElementById("recipes");
    recipesContainer.innerHTML = "";
    const picture = `assets/plat.jpg`;
    result.forEach((recipe) => {
      let recipeCardTemplate = "";
      recipeCardTemplate += `<div class="article-recipes" id=${recipe.id} tabindex="1">
                                      <img src="${picture}" alt="photo de la recette" class="plate">
                                        <div class="card">
                                          <div class="header-recipe">
                                            <h5 class="name-recipe" title="${recipe.name}" tabindex="1">${recipe.name}</h5>
                                              <div>
                                                <p class="time" tabindex="1"><i class="far fa-clock"></i>${recipe.time} min</p>   
                                              </div>
                                          </div>
                                                <div class="body-recipe">
                                                  <ul class="recipe-ingredients"> `;

      recipe.ingredients.forEach((element) => {
        let unit = "";
        if (element.unit !== undefined) {
          unit = element.unit;
        }

        recipeCardTemplate += `<li><strong>${element.ingredient}:</strong> ${element.quantity} ${unit}</li>`;
      });

      recipeCardTemplate += ` </ul>
                                <p class="card-text description">${recipe.description}</p>
                                </div>
                              </div>
                            </div>`;
      recipesContainer.insertAdjacentHTML("beforeend", recipeCardTemplate);
    });
  }
}
