import app from "./app";

// Server
app.listen(app.get("port"), () => {
  console.log("Server is running on port", app.get("port"));
});
