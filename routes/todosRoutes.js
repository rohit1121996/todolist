/** @format */

const todosController = require("../controller/todosController.js");

const router = require("express").Router();

router.post("/addTodo", todosController.addTodo);

router.get("/allTodos", todosController.getAllTodos);

router.get("/:id", todosController.getOneTodo);

router.put("/:id", todosController.updateTodo);

router.delete("/:id", todosController.deleteTodo);

module.exports = router;
