const { DataTypes } = require('sequelize');
const { db } = require('../config/database');
const bcrypt = require('bcryptjs');

const User = db.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    balance: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    }
}, {
    timestamps: true,
});

User.prototype.isValidPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = User;