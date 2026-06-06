require("dotenv").config();

const express = require("express");
const ApiError = require("./errors/apiError");
const connectDB = require("../config/db");
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const errorHandler = require("./middleware/errorHandler");

const app = express();

connectDB();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.use((req, res, next) => {
  next(ApiError.NotFound("Route not found."));
});

app.use(errorHandler);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server Running On Port ${PORT}`);

});