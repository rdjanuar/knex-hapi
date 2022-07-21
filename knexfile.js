module.exports = {
  development: {
    migrations: { tableName: "knex_migrations" },
    client: "pg",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "00713s22",
      database: "book_self",
      charset: "utf8",
    },
  },
};
