import app from "./app.js";
const port=1339;

model.initialize(dbName, false) 
  .then(
    app.listen(port) // Run the server
  );