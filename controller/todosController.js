/** @format */

const db = require("../models");

// create main model

const Todos = db.todos;
const Users = db.users;

// main work

// create product

const addTodo = async (req, res) => {
  if (req.body.todoName && req.body.description && req.body.userId) {
    let info = {
      todoName: req.body.todoName,
      description: req.body.description,
      userId: req.body.userId,
    };
    const todo = await Todos.create(info);
    res.status(200).send(todo);
  } else {
    res.status(400).send("All three field is required!");
  }
};

// get all todos

const getAllTodos = async (req, res) => {
  let todos = await Todos.findAll({
    include: [
      {
        model: Users,
        required: true,
        as: "user",
      },
    ],
  });
  res.status(200).send(todos);
};

// get One todo

const getOneTodo = async (req, res) => {
  let id = req.params.id;
  let todo = await Todos.findOne({
    include: [
      {
        model: Users,
        required: true,
        as: "user",
      },
    ],
    where: { id: id },
  });
  res.status(200).send(todo);
};

// update todo

const updateTodo = async (req, res) => {
  let id = req.params.id;
  if (req.body.todoName && req.body.description && req.body.userId) {
    let info = {
      todoName: req.body.todoName,
      description: req.body.description,
      userId: req.body.userId,
    };
    const todo = await Todos.update(info, { where: { id: id } });
    res.status(200).send(todo);
  } else {
    res.status(400).send("All three field is required!");
  }
};

// delete todo

const deleteTodo = async (req, res) => {
  let id = req.params.id;
  await Todos.destroy({ where: { id: id } });
  res.status(200).send("Deleted todo.");
};

module.exports = {
  addTodo,
  getAllTodos,
  getOneTodo,
  updateTodo,
  deleteTodo,
};
