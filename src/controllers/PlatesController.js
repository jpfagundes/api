const knex = require("../database/knex");

class PlatesController {
  async create(request, response) {
    const { name, description, ingredients, category, price } = request.body;

    const plate_id = await knex("plates").insert({
      name,
      description,
      price
      
    });

    const ingredientsInsert = ingredients.map(name => {
      return {
        plate_id,
        name
      }
    });

    await knex("ingredients").insert(ingredientsInsert);


    return response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const plate = await knex("plates").where({ id }).first();
    const ingredients = await knex("ingredients").where({ plate_id: id }).orderBy("name");

    return response.json({
      ...plate,
      ingredients
    });
  }

  async delete (request, response) {
    const { id } = request.params;

    await knex("plates").where({ id }).delete();

    return response.json();
  }

  async index (request, response) {
    const { name, ingredients } = request.query;

    let plates;


    if (ingredients) {
      const filterIngredients = ingredients.split(',')
      .map (ingredient => ingredient.trim());

      plates = await knex("ingredients")
      .select("*")
      .whereLike("plates.name", `%${name}%`)
      .innerJoin("plates", "plates.id", "ingredients.plate_id")
      .orderBy("plates.name")
      


    } else {
        plates = await knex("plates")
        .select("*")
        .whereLike("name", `%${name}%`)
        .orderBy("name");

    }

    const userIngredients = await knex("ingredients").select("*");
    const platesWithIngredients = plates.map(plate => {
      const plateIngredients = userIngredients.filter(ingredient => ingredient.plate_id === plate.id);

      return {
        ...plate,
        ingredients: plateIngredients
      }
    });

    return response.json(platesWithIngredients);
 
  }
}

module.exports = PlatesController;