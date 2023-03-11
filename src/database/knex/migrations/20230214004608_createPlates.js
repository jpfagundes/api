
exports.up = knex => knex.schema.createTable("plates", table => {
  table.increments("id");
  table.text("name");
  table.text("description");
  table.text("category");
  table.varchar("image");
  table.decimal("price", 2);

  table.timestamp("created_at").default(knex.fn.now());

});

exports.down = knex => knex.schema.dropTable("plates");
