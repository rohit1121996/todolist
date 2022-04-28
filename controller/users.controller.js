const db = require('../models');
const users = db.users;

exports.createUser = (req, res) => {
    users.create({
        name: req.body.name,
        teamId: req.body.teamId,
        priority: req.body.priority
    }).then(user => {
        res.send(user);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
}

exports.updateUser = (req, res) => {
    users.update({
        name: req.body.name,
        teamId: req.body.teamId,
        priority: req.body.priority
    }, {
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.send({
            message: "User was updated successfully."
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while updating the User."
        });
    });
}

