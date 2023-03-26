const knex = require("../database/knex");

class UserRepository {
  async findByEmail(email) {
    const user = await knex.select("email").where({ email }).from("users")

    return user;
  }

  async create({ name, email, password, admin }) {
    const userId = await knex("users").insert({ name, email, password, admin })

    return { id: userId };
  }

}

module.exports = UserRepository