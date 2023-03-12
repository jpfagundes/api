
exports.up = knex => knex.schema.createTable("dishes", table => {
  table.increments("id");
  table.text("name");
  table.text("description");
  table.varchar("image");
  table.decimal("price", 2);

  table.timestamp("created_at").default(knex.fn.now());

});

exports.down = knex => knex.schema.dropTable("dishes");
