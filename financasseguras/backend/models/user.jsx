import { db } from '../config/database';

class User {
    constructor() {
        this.model = db.define('users', {
            id: {
                type: db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: db.Sequelize.STRING
            },
            cpf: {
                type: db.Sequelize.STRING
            },
            email: {
                type: db.Sequelize.STRING
            },
            password: {
                type: db.Sequelize.STRING
            },
            balance: {
                type: db.Sequelize.DECIMAL(10, 2),
            },
            taxReceipt: {
                type: db.Sequelize.BLOB,
            }
        });
    }
}

export default (new User).model;