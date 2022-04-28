module.exports = (Sequelize, sequelize) => {
    const users = sequelize.define('users', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        teamId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: null,
            references: {
                model: 'team',
                key: 'id',
                onDelete: 'SET NULL'
            }
        },
        priority: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    }, {
        tableName: "users",
        freezeTableName: true
    });
    return users;
}
