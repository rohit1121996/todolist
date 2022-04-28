const db = require('../models');
const team = db.team;

exports.getAllTeams = (req, res) => {
    team.findAll().then(teams => {
        res.send(teams);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving teams."
        });
    });
};

exports.createTeam = (req, res) => {
    team.create({
        name: req.body.name
    }).then(team => {
        res.send(team);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Team."
        });
    });
}

exports.updateTeam = (req, res) => {
    team.update({
        name: req.body.name
    }, {
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.send({
            message: "Team was updated successfully."
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while updating the Team."
        });
    });
}
