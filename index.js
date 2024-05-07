const express = require("express");
const cors = require("cors");
const app = express();
const { readdirSync } = require("fs");

app.use(cors());

// Set public directory as the root for static files, so everything inside public is referenced from the base URL
app.use(express.static('public'));

// dynamically loads routes from the routes directory, applying them to the root path. 
readdirSync("./routes").map((file) =>
  app.use("/", require("./routes/" + file))
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

require("dotenv").config();
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
