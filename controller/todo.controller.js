const db = require("../models");

exports.getAllTodos = (req, res) => {
  // Query to find all todos with user details and team details
  query = `SELECT todo.id, todo.name, todo.description, todo."userId", users.name AS userName, users.priority, team.name AS teamName FROM todo LEFT JOIN users ON todo."userId" = users.id LEFT JOIN team ON users."teamId" = team.id`;

  // execute query using sequelize
  db.sequelize
    .query(query, {
      type: db.sequelize.QueryTypes.SELECT,
    })
    .then((todos) => {
      res.send(todos);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving todos.",
      });
    });
};

exports.createTodo = (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const teamId = req.body.teamId;

  // query to find all user id which are not present in todos table and their team id is same as team id passed in request
  query = `SELECT * FROM users WHERE users.id NOT IN (SELECT "userId" FROM todo) AND users."teamId" = ${teamId}  ORDER by priority`;
  // execute query using sequelize
  db.sequelize
    .query(query, {
      type: db.sequelize.QueryTypes.SELECT,
    })
    .then((users) => {
      // Add todo to the first user found
      if (users.length > 0) {
        query = `INSERT INTO todo ("name", "description", "teamId", "userId") VALUES ('${name}', '${description}', ${teamId}, ${users[0].id})`;
        db.sequelize
          .query(query, {
            type: db.sequelize.QueryTypes.INSERT,
          })
          .then(() => {
            res.send({
              message: "Todo was created successfully.",
              todo: {
                name,
                description,
                teamId,
                userId: users[0].id,
              },
            });
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Todo.",
            });
          });
      } else {
        // Query to find all users in todos table grouped by count of their user id and order by count and priority
        query = `SELECT users.id, users.name, users.priority, COUNT(todo."userId") 
        AS count FROM users LEFT JOIN todo ON users.id = todo."userId"
        GROUP BY users.id ORDER BY count ASC, users.priority limit 1;`;

        // execute query using sequelize
        db.sequelize
          .query(query, {
            type: db.sequelize.QueryTypes.SELECT,
          })
          .then((users) => {
            // Add todo to the first user found
            if (users.length > 0) {
              query = `INSERT INTO todo ("name", "description", "teamId", "userId") VALUES ('${name}', '${description}', ${teamId}, ${users[0].id})`;
              db.sequelize
                .query(query, {
                  type: db.sequelize.QueryTypes.INSERT,
                })
                .then(() => {
                  res.send({
                    message: "Todo was created successfully.",
                    todo: {
                      name,
                      description,
                      teamId,
                      userId: users[0].id,
                    },
                  });
                })
                .catch((err) => {
                  res.status(500).send({
                    message:
                      err.message ||
                      "Some error occurred while creating the Todo.",
                  });
                });
            } else {
              res.status(500).send({
                message: "No users found to add todo.",
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Todo.",
            });
          });
      }
    });
};
