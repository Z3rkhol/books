const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Author = sequelize.define("Author", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "first_name",  // odpovídá sloupci v databázi
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "last_name",   // odpovídá sloupci v databázi
  },
}, {
  tableName: 'authors',  // explicitní určení názvu tabulky
  timestamps: false,     // protože tabulka nemá sloupce createdAt/updatedAt
});

module.exports = Author;