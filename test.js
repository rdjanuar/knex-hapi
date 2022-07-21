const axios = require("axios");

// Random name
const name = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

for (let i = 0; i < 100; i++) {
  axios
    .post("http://127.0.0.1:8080/api/v1/book", {
      name:
        Math.floor(Math.random() * 100) +
        name[Math.floor(Math.random() * name.length)],
      year: 2022,
      author: "Mahendra",
      summary: "awikwok",
      publisher: "PT Iin Brutal Tbk",
      pageCount: 150,
      readCount: 150,
    })
    .then((response) => {
      if (response) {
        console.log("success menambahkan data");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
