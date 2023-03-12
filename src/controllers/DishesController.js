const knex = require("../database/knex");

class DishesController {
  async create(request, response) {
    const { name, description, ingredients, price, image } = request.body;

    const dish_id = await knex("dishes").insert({
      name,
      description,
      price,
      image
      
    });

    const ingredientsInsert = ingredients.map(name => {
      return {
        dish_id,
        name
      }
    });

    await knex("ingredients").insert(ingredientsInsert);


    return response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const dish = await knex("dishes").where({ id }).first();
    const ingredients = await knex("ingredients").where({ dish_id: id }).orderBy("name");

    return response.json({
      ...dish,
      ingredients
    });
  }

  async delete (request, response) {
    const { id } = request.params;

    await knex("dishes").where({ id }).delete();

    return response.json();
  }

  async index (request, response) {
    const { name, ingredients } = request.query;

    let dishes;


    if (ingredients) {
      const filterIngredients = ingredients.split(',')
      .map (ingredient => ingredient.trim());

      dishes = await knex("ingredients")
      .select("*")
      .whereLike("dishes.name", `%${name}%`)
      .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
      .groupBy("dishes.id")
      .orderBy("dishes.name")
      


    } else {
        dishes = await knex("dishes")
        .select("*")
        .whereLike("name", `%${name}%`)
        .orderBy("name");

    }

    const userIngredients = await knex("ingredients").select("*");
    const dishesWithIngredients = dishes.map(dish => {
      const dishIngredients = userIngredients.filter(ingredient => ingredient.dish_id === dish.id);

      return {
        ...dish,
        ingredients: dishIngredients
      }
    });

    return response.json(dishesWithIngredients);
 
  }
}

module.exports = DishesController;