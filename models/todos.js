/** @format */

module.exports = (sequelize, DataTypes) => {
  const TodoList = sequelize.define("todolist", {
    todoName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  });

  return TodoList;
};
