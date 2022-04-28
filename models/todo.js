module.exports = (Sequelize, sequelize) => {
    const todo = sequelize.define('todo', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
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
        userId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: null,
            references: {
                model: 'users',
                key: 'id',
                onDelete: 'SET NULL'
            }
        },
    }, {
        tableName: "todo",
        freezeTableName: true
    });
    return todo;
}