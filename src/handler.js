const { genSalt, hash, compare } = require("bcrypt");
const knex = require("./knex");
const JWT = require("jsonwebtoken");

const getAllbooks = async (request, h) => {
  const getBooks = await knex("buku").then((result) => {
    if (request.query.name) {
      const filter = result.filter(({ name }) =>
        name.toLowerCase().includes(String(request.query.name).toLowerCase())
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
          result: {
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
        totalData: result.length,
        // get all books
        result: {
          books: result,
        },
      })
      .code(200);
    return response;
  });
  return getBooks;
};

const getBookById = async (request, h) => {
  const { bookId } = await request.params;
  const getBook = await knex("buku")
    .where({ id: Number(bookId) })
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

const createBooks = async (request, h) => {
  const tableName = "buku";
  const { name, year, author, summary, publisher, pageCount, readCount } =
    request.payload;
  const finished = pageCount === readCount;
  let reading = readCount >= 1 ? true : false;
  if (finished) {
    reading = false;
  }

  if (!name) {
    const response = h
      .response({
        status: "fail",
        message: "Nama tidak boleh kosong",
      })
      .code(400);
    return response;
  }
  const getBook = await knex("buku")
    .insert({
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readCount,
      finished,
      reading,
    })
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

const updateBook = async (request, h) => {
  const { bookId } = request.params;
  const { name, year, author, summary, publisher, pageCount, readCount } =
    request.payload;
  const getBook = await knex("buku")
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

const deleteBookId = async (request, h) => {
  const { bookId } = request.params;
  const getBook = await knex("buku")
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

const createUsers = async (request, h) => {
  const tableName = "users";
  const { username, password } = request.payload;
  const salt = await genSalt(10);
  const hashPassword = await hash(password, salt);
  const getUser = await knex(tableName)
    .insert({
      username,
      password: hashPassword,
    })
    .into(tableName)
    .returning("*")
    .then((users) => {
      const findUsers = users.find(({ username }) => username === username);
      const token = JWT.sign({ id: findUsers.id }, "mabarkeun123456");
      const response = h
        .response({
          status: "success",
          message: "User berhasil ditambahkan",
          data: {
            users,
            token,
          },
        })
        .code(201);
      return response;
    })
    .catch(() => {
      const response = h
        .response({
          status: "fail",
          message: "username sudah terdaftar",
        })
        .code(400);
      return response;
    });
  return getUser;
};

const loginUser = async (request, h) => {
  const { username, password } = request.payload;
  const getUser = await knex("users")
    .where({ username })
    .then(async (result) => {
      const findUser = result.find(({ username }) => username === username);
      const token = JWT.sign({ id: findUser.id }, "mabarkeun123456", {
        expiresIn: 6000,
      });
      const comparePassword = await compare(password, findUser.password);

      if (!comparePassword) {
        const response = h
          .response({
            status: "fail",
            message: "Password salah",
          })
          .code(400);
        return response;
      }

      const response = h
        .response({
          status: "success",
          message: `User berhasil login`,
          data: {
            findUser,
            token,
          },
        })
        .code(200)
        .header("Authorization", `Bearer ${token}`);
      return response;
    })
    .catch(() => {
      const response = h
        .response({
          status: "fail",
          message: `User dengan username ${username} tidak ditemukan`,
        })
        .code(404);
      return response;
    });

  return getUser;
};

const getUser = async (request, h) => {
  const getUser = await knex("users").then((results) => {
    const response = h
      .response({
        status: "success",
        message: "Berhasil Mendapatkan Data",
        totalUsers: results.length,
        data: {
          results,
        },
      })
      .code(200);
    return response;
  });
  return getUser;
};

module.exports = {
  getAllbooks,
  getBookById,
  createBooks,
  updateBook,
  deleteBookId,
  createUsers,
  loginUser,
  getUser,
};
