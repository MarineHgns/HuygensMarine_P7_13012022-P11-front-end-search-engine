export default function recipeFactory(recipes, recipeCardTemplate) {
  function createCardRecipe() {
    const { id, name, ingredients, description, time } = recipes;
    const picture = `assets/plat.jpg`;

    recipeCardTemplate += `
                                <div class="article ${id}" >
                                    <img src="${picture}" alt="photo de la recette" class="plate">
                                        <div class="card">
                                            <div class="header-recipe">
                                                <h2 class="name-recipe" title="${name}">${name}</h2>
                                                <p class="time"><i class="far fa-clock"></i> ${time} min</p> 
                                            </div>
                                        <div class="body-recipe">
                                            <div class="recipe-ingredients">
    
                            `;

    for (const ingredient of ingredients) {
      recipeCardTemplate += `<span class="bold"> ${ingredient.ingredient}</span>`;
      if (ingredient.quantity) {
        recipeCardTemplate += `<span class="bold">: ${ingredient.quantity}</span> `;
      }
      if (ingredient.unit) {
        recipeCardTemplate += ` ${ingredient.unit}`;
      }
      recipeCardTemplate += `<br>`;
    }

    recipeCardTemplate += `
                                                </div>
                                            <div class="description">${description}</div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                              `;

    return recipeCardTemplate;
  }
  return { createCardRecipe };
}
