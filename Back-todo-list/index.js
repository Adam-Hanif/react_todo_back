const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();


app.use(cors());
app.use(express.json());
app.use(require("./routes/todos.route"));
app.use(require("./routes/users.route"));

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Успешно соединился с сервером MongoDB"))
  .catch(() => console.log("Ошибка при соединении с сервером MongoDB"));

app.listen(process.env.PORT, () => {
  console.log("сервер запущен");
});
