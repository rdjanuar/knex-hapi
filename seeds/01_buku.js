/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const tableName = "buku";

  const rows = [
    {
      name: "Sekul",
      year: 2004,
      author: "RIzky Djanuar",
      summary: "Anjay",
      publisher: "PT Cinta Sejati",
      pageCount: 100,
      readCount: 50,
    },
    {
      name: "Sekolah",
      year: 2004,
      author: "RIzky Djanuar",
      summary: "Anjay",
      publisher: "PT Cinta Sejati",
      pageCount: 100,
      readCount: 50,
    },
  ];

  return knex(tableName)
    .del()
    .then(() => {
      return knex.insert(rows).into(tableName);
    });
};
