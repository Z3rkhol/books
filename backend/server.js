const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");

// Import rout
const authorRoutes = require("./routes/authorRoutes");
const bookRoutes = require("./routes/bookRoutes");
const genreRoutes = require("./routes/genreRoutes");

const app = express();

app.use(express.json());
app.use(cors());

// Registrace API endpointů
app.use("/api/authors", authorRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/genres", genreRoutes);

const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server běží na portu ${PORT}`));
});