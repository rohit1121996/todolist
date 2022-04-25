/** @format */

const db = require("../models");

// create main model

const Todos = db.todos;
const Users = db.users;

// main work

// create product

const addUser = async (req, res) => {
  if (req.body.name && req.body.email && req.body.number) {
    let info = {
      name: req.body.name,
      email: req.body.email,
      number: req.body.number,
    };
    const user = await Users.create(info);
    res.status(200).send(user);
  } else {
    res.status(400).send("All three field is required!");
  }
};

// get all todos

const getAllUsers = async (req, res) => {
  let users = await Users.findAll({});
  res.status(200).send(users);
};

// get One todo

const getOneUser = async (req, res) => {
  let id = req.params.id;
  let user = await Users.findOne({ where: { id: id } });
  res.status(200).send(user);
};

// update todo

const updateUser = async (req, res) => {
  let id = req.params.id;
  if (req.body.name && req.body.email && req.body.number) {
    let info = {
      name: req.body.name,
      email: req.body.email,
      number: req.body.number,
    };
    const user = await Users.update(info, { where: { id: id } });
    res.status(200).send(user);
  } else {
    res.status(400).send("All three field is required!");
  }
};

// delete todo

const deleteUser = async (req, res) => {
  let id = req.params.id;
  await Users.destroy({ where: { id: id } });
  res.status(200).send("Deleted user.");
};

module.exports = {
  addUser,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
};
