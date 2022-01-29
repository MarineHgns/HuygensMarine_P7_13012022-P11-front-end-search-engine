export default function recipeFactory(recipes, recipeCardTemplate) {
  function createCardRecipe() {
    const { id, name, ingredients, description, time } = recipes;
    const picture = `assets/plat.jpg`;

    recipeCardTemplate += `
                                <div class="article ${id}" tabindex="1">
                                    <img src="${picture}" alt="photo de la recette" class="plate">
                                        <div class="card">
                                            <div class="header-recipe">
                                                <h2 class="name-recipe" title="${name}" tabindex="1">${name}</h2>
                                                <p class="time" tabindex="1"><i class="far fa-clock"></i> ${time} min</p> 
                                            </div>
                                        <div class="body-recipe">
                                            <div class="recipe-ingredients tabindex="1"">
    
                            `;

    for (const ingredient of ingredients) {
      recipeCardTemplate += `<span class="bold" tabindex="1"> ${ingredient.ingredient}</span>`;
      if (ingredient.quantity) {
        recipeCardTemplate += `<span class="bold" tabindex="1">: ${ingredient.quantity}</span> `;
      }
      if (ingredient.unit) {
        recipeCardTemplate += ` ${ingredient.unit}`;
      }
      recipeCardTemplate += `<br>`;
    }

    recipeCardTemplate += `
                                                </div>
                                            <div class="description" tabindex="1">${description}</div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                              `;

    return recipeCardTemplate;
  }
  return { createCardRecipe };
}
