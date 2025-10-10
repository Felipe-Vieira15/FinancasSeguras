const database = require('../config/database');

class User {
    constructor() {
        this.model = database.db.define('users', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: database.db.Sequelize.STRING
            },
            cpf: {
                type: database.db.Sequelize.STRING
            },
            email: {
                type: database.db.Sequelize.STRING
            },
            password: {
                type: database.db.Sequelize.STRING
            },
            balance: {
                type: database.db.Sequelize.DECIMAL(10, 2),
            },
            taxReceipt: {
                type: database.db.Sequelize.BLOB,
            }
        });
    }
}

module.exports = (new User).model;