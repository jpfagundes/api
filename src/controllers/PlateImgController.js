const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class PlateImgController {
  async update(request, response) {
    const {id} = request.params;
    const imageFilename = request.file.filename;

    const diskStorage = new DiskStorage();

    try {
      const plate = await knex("plates")
      .where( 'id', id ).first();
  
  
      if(!plate) {
        throw new AppError("Esse prato não existe", 400);
      }
  
      if(plate.image){
        await diskStorage.deleteFile(plate.image);
      }
  
      const filename = await diskStorage.saveFile(imageFilename);
      plate.image = filename;

  
      await knex("plates").update(plate).where('id', id);
  
      return response.json(plate);

    } catch (error) {

      throw new AppError("Não foi possível atualizar a imagem.", 400);
    }
  }
}

module.exports = PlateImgController;