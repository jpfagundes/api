exports.up = knex => knex.schema.createTable("ingredients", table => {
  table.increments("id");
  table.text("name").notNullable();
  table.varchar("image");
  table.integer("dish_id").references("id").inTable("dishes").onDelete("CASCADE");
    
});

exports.down = knex => knex.schema.dropTable("ingredients");
