/** @format */

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

// const db = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "rohit",
//   database: "todolist",
// });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routerTodos = require("./routes/todosRoutes.js");
app.use("/api/todos", routerTodos);
const routerUsers = require("./routes/userRoutes.js");
app.use("/api/users", routerUsers);

app.get("/", (req, res) => {
  res.send("Hello express");
});
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
