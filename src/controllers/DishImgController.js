const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class DishImgController {
  async update(request, response) {
    const {id} = request.params;
    const imageFilename = request.file.filename;

    const diskStorage = new DiskStorage();

    try {
      const dish = await knex("dishes")
      .where( 'id', id ).first();
  
  
      if(!dish) {
        throw new AppError("Esse prato não existe", 400);
      }
  
      if(dish.image){
        await diskStorage.deleteFile(dish.image);
      }
  
      const filename = await diskStorage.saveFile(imageFilename);
      dish.image = filename;

  
      await knex("dishes").update(dish).where('id', id);
  
      return response.json(dish);

    } catch (error) {

      throw new AppError("Não foi possível atualizar a imagem.", 400);
    }
  }
}

module.exports = DishImgController;