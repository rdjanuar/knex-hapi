const knex = require("./knex");

const getAllbooks = (request, h) => {
  const getBooks = knex("buku")
    .select("id", "name", "publisher")
    .then((result) => {
      if (request.query.name) {
        const filter = result.find(
          ({ name }) =>
            name.toLowerCase() === String(request.query.name).toLowerCase()
        );
        if (!filter) {
          const response = h
            .response({
              status: "fail",
              message: `Buku dengan nama ${request.query.name} tidak ditemukan`,
            })
            .code(404);
          return response;
        }
        const response = h
          .response({
            status: "success",
            data: {
              books: filter,
            },
          })
          .code(200);
        return response;
      }
      if (!result || result.length === 0) {
        const response = h
          .response({
            error: true,
            errMessage: "buku tidak ditemukan",
          })
          .code(404);
        return response;
      }
      const response = h
        .response({
          status: "success",
          data: {
            books: result,
          },
        })
        .code(200);
      return response;
    });
  return getBooks;
};

const getBookById = (request, h) => {
  const { bookId } = request.params;
  const getBook = knex("buku")
    .where({ id: bookId })
    .then((result) => {
      const findId = result.find(({ id }) => id === Number(bookId));
      if (!findId) {
        const response = h
          .response({
            status: "fail",
            message: `Buku dengan id ${bookId} tidak ditemukan`,
          })
          .code(404);
        return response;
      }
      const response = h
        .response({
          dataCount: result.length,
          data: result,
        })
        .code(200);
      return response;
    });
  return getBook;
};

const createBooks = (request, h) => {
  const tableName = "buku";
  const { name, year, author, summary, publisher, pageCount, readCount } =
    request.payload;
  if (!name) {
    const response = h
      .response({
        status: "fail",
        message: "Nama tidak boleh kosong",
      })
      .code(400);
    return response;
  }
  const getBook = knex("buku")
    .insert({ name, year, author, summary, publisher, pageCount, readCount })
    .into(tableName)
    .returning("id")
    .then((bookId) => {
      const response = h
        .response({
          status: "success",
          message: "Buku berhasil ditambahkan",
          data: {
            bookId,
          },
        })
        .code(201);
      return response;
    });
  return getBook;
};

const updateBook = (request, h) => {
  const { bookId } = request.params;
  const { name, year, author, summary, publisher, pageCount, readCount } =
    request.payload;
  const getBook = knex("buku")
    .where({ id: Number(bookId) })
    .update({ name, year, author, summary, publisher, pageCount, readCount })
    .returning("id")
    .then((result) => {
      const findId = result.find(({ id }) => id === Number(bookId));
      if (!findId) {
        const response = h
          .response({
            status: "fail",
            message: `Buku dengan id ${bookId} tidak ditemukan`,
          })
          .code(404);
        return response;
      }
      const response = h
        .response({
          status: "success",
          message: "Buku berhasil diperbarui",
        })
        .code(200);
      return response;
    });
  return getBook;
};

const deleteBookId = (request, h) => {
  const { bookId } = request.params;
  const getBook = knex("buku")
    .where({ id: Number(bookId) })
    .del("id")
    .then((result) => {
      const findId = result.find(({ id }) => id === Number(bookId));
      if (!findId) {
        const response = h
          .response({
            status: "fail",
            message: `Buku dengan id ${bookId} tidak ditemukan`,
          })
          .code(404);
        return response;
      }
      const response = h
        .response({
          status: "success",
          message: `Buku dengan id ${bookId} berhasil di hapus`,
        })
        .code(200);
      return response;
    });
  return getBook;
};

module.exports = {
  getAllbooks,
  getBookById,
  createBooks,
  updateBook,
  deleteBookId,
};
