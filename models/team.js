module.exports = (Sequelize, sequelize) => {
    const team = sequelize.define('team', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },{
        tableName: "team",
        freezeTableName: true
    });
    return team;
}
