const { DataTypes } = require('sequelize');
const { db } = require('../config/database');

const Category = db.define('category', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
   },
   name: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   type: {
      type: DataTypes.ENUM('receita', 'despesa'),
      allowNull: false,
   },
   userId: {
      type: DataTypes.INTEGER,
      references: {
         model: 'users',
         key: 'id'
      },
      allowNull: false
   }
})

module.exports = Category;