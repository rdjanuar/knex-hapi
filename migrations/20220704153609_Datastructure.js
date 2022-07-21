/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("buku", (books) => {
    // Primary keys
    books.increments();

    books.string("name", 50).notNullable();
    books.integer("year", 4).notNullable();
    books.string("author", 50).notNullable();
    books.string("summary", 50).notNullable();
    books.string("publisher", 50).notNullable();
    books.integer("pageCount", 2000).notNullable();
    books.integer("readCount", 2000).notNullable();
    books.boolean("reading");
    books.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("buku");
};
