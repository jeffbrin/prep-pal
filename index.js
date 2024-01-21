import app from "./app.js";
const port=80;

model.initialize(dbName, false) 
  .then(
    app.listen(port) // Run the server
  );