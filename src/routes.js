const {
  getAllbooks,
  getBookById,
  createBooks,
  updateBook,
  deleteBookId,
  createUsers,
  loginUser,
  getUser,
} = require("./handler");

const Joi = require("joi");

const routes = [
  {
    method: "GET",
    path: "/api/v1/book",
    options: {
      cors: true,
    },
    handler: getAllbooks,
  },
  {
    method: "GET",
    path: "/api/v1/book/{bookId}",
    options: {
      cors: true,
    },
    handler: getBookById,
  },
  {
    method: "POST",
    path: "/api/v1/book",
    options: {
      cors: true,
    },
    handler: createBooks,
  },
  {
    method: "PUT",
    path: "/api/v1/book/{bookId}",
    options: {
      cors: true,
      handler: updateBook,
    },
  },
  {
    method: "DELETE",
    path: "/api/v1/book/{bookId}",
    options: {
      cors: true,
      handler: deleteBookId,
    },
  },
  {
    method: "POST",
    path: "/api/v1/auth/login",
    options: {
      cors: true,
      auth: false,
      state: {
        parse: true,
        failAction: "error",
      },
      validate: {
        payload: Joi.object({
          username: Joi.string().required().min(6).max(16),
          password: Joi.string().required().min(6).max(16),
        }),
      },
    },
    handler: loginUser,
  },
  {
    method: "POST",
    path: "/api/v1/auth/register",
    options: {
      cors: true,
      auth: false,
      validate: {
        payload: Joi.object({
          username: Joi.string().required().min(6).max(16),
          password: Joi.string().required().min(6).max(16),
        }),
      },
    },
    handler: createUsers,
  },
  {
    method: "GET",
    path: "/api/v1/users",
    options: {
      cors: true,
      handler: getUser,
    },
  },
];

module.exports = { routes };
