const express = require("express");
const router = express.Router();

const teamController = require("../controller/team.controller");
const userController = require("../controller/users.controller");
const todoController = require("../controller/todo.controller");

router.post("/user", userController.createUser);
router.put("/user/:id", userController.updateUser);
router.get("/team", teamController.getAllTeams);
router.post("/team", teamController.createTeam);
router.put("/team/:id", teamController.updateTeam);
router.get("/todo", todoController.getAllTodos);
router.post("/todo", todoController.createTodo);

module.exports = router;
