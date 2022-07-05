const {
  getAllbooks,
  getBookById,
  createBooks,
  updateBook,
  deleteBookId,
} = require("./handler");

const routes = [
  {
    method: "GET",
    path: "/book",
    handler: getAllbooks,
  },
  {
    method: "GET",
    path: "/book/{bookId}",
    handler: getBookById,
  },
  {
    method: "POST",
    path: "/book",
    handler: createBooks,
  },
  {
    method: "PUT",
    path: "/book/{bookId}",
    handler: updateBook,
  },
  {
    method: "DELETE",
    path: "/book/{bookId}",
    handler: deleteBookId,
  },
];

module.exports = { routes };
