import { recipes } from "../recipes.js";

recipes.map((recipes) => {
  const picture = `assets/plat.jpg`;

  let recipesSection = document.getElementsByClassName("recipes");
  let article = document.createElement("article");
  let recipesTemplate = `  
                                <img src="${picture}" alt="photo de la recette" class="plate">
                                <div class="card">
                                <h2 title="${recipes.name}">${recipes.name}</h2>
                                <p class="time"><i class="far fa-clock"></i> ${recipes.time} min</p>
                                <p class="ingrédients">mettre ingrédients</p>
                                <p class="description" title="${recipes.description}">${recipes.description}</p>
                                </div>
                        `;

  recipesSection[0].appendChild(article);
  article.innerHTML = recipesTemplate;
});
