
exports.up = knex => knex.schema.createTable("dishes", table => {
  table.increments("id");
  table.string("name");
  table.string("description");
  table.string("image");
  table.decimal("price", 2);
  table.string("category");

  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());


});

exports.down = knex => knex.schema.dropTable("dishes");
