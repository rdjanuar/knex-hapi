const knex = require("../knex");

const validasi = async (request, decoded) => {
  const getusers = await knex("users")
    .returning("*")
    .then(async (result) => {
      const finduser = result.filter(({ id }) => id === request.id);
      if (!finduser) {
        return { isValid: false };
      }
      return { isValid: true, credentials: finduser };
    });
  return getusers;
};

module.exports = validasi;
