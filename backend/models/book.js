// backend/models/book.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Author = require("./author");
const Genre = require("./genre");

const Book = sequelize.define("Book", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  releaseDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    field: "release_date",  // databázový sloupec je release_date
  },
  // Definujeme cizí klíče s překladem na správné názvy sloupců:
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "author_id",
  },
  genreId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "genre_id",
  },
}, {
  tableName: 'books',
  timestamps: false,
});

// Nastavení asociací:
Book.belongsTo(Author, { foreignKey: "authorId" });
Book.belongsTo(Genre, { foreignKey: "genreId" });
Author.hasMany(Book, { foreignKey: "authorId" });
Genre.hasMany(Book, { foreignKey: "genreId" });

module.exports = Book;