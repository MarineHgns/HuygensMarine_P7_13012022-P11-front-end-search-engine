import { recipes } from "../../recipes.js";
import { formattingData } from "./formattingData.js";
import { wordRemoved } from "./wordRemoved.js";

export { RecipesClean };
export default class RecipesClean {
  static clean() {
    this.recipesClean = [];

    recipes.forEach((recipe, index) => {
      this.recipesClean.push({
        id: recipe.id,
        name: formattingData(recipe.name),
        ingredientsString: "",
        description: formattingData(recipe.description),
      });
      recipe.ingredients.forEach((ingredient) => {
        let table = wordRemoved(ingredient.ingredient);
        table.forEach((elt) => {
          this.recipesClean[index].ingredientsString += elt + " ";
        });
      });
    });

    return this.recipesClean;
  }
}
