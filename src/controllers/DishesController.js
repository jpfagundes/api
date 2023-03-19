const knex = require("../database/knex");

function ingredientImage(name) {
  switch (name) {
    case 'alface':
      return 'alface.png'
    case 'ameixa':
      return 'ameixa.png'
    case 'amêndoas':
      return 'amêndoas.png'
    case 'aniz':
      return 'aniz.png'
    case 'café':
      return 'café.png'
    case 'camarão':
      return 'camarão.png'
    case 'canela':
      return 'canela.png'
    case 'claras':
      return 'claras.png'
    case 'damasco':
      return 'damasco.png'
    case 'farinha':
      return 'farinha.png'
    case 'limão':
      return 'limão.png'
    case 'maçã':
      return 'maçã.png'
    case 'massa':
      return 'massa.png'
    case 'pão naan':
      return 'pão naan.png'
    case 'pão':
      return 'pão.png'
    case 'pepino':
      return 'pepino.png'
    case 'pêssego':
      return 'pêssego.png'
    case 'pesto':
      return 'pesto.png'
    case 'maracujá':
      return 'maracujá.png'
    case 'presunto':
      return 'presunto.png'
    case 'rabanete':
      return 'rabanete.png'
    case 'rúcula':
      return 'rúcula.png'
    case 'tomate':
      return 'tomate.png'
    case 'whiskey':
      return 'whiskey.png'
    default:
      return 'default'
  }
}

class DishesController {
  async create(request, response) {
    const { name, description, ingredients, price, category } = request.body;

    const [dish_id] = await knex("dishes").insert({
      name,
      description,
      price,
      category,
    });


    if (ingredients){
      const ingredientsInsert = ingredients.map(ingredient => {
        return {
          name : ingredient,
          image : ingredientImage(ingredient),
          dish_id
        }
      });

      await knex("ingredients").insert(ingredientsInsert);
    }

    return response.json({dish_id})

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