if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const routes = require("./routes");

// App
const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/", routes);

// Port
const port = process.env.PORT || 3000;

// Server
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
