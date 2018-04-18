// two packages built into node
const path = require("path");
const { createServer } = require("http");

const express = require("express");
// Node.js compression middleware.
const compression = require("compression");
//HTTP request logger middleware for node.js
const morgan = require("morgan");

const normalizePort = port => parseInt(port, 10); // conver to integer
const PORT = normalizePort(process.env.PORT || 8080);

// variable that defines your application, defines express
const app = express();
const dev = app.get("env") !== "production";

if (!dev) {
  app.disable("x-powered-by");
  app.use(compression());
  app.use(morgan("common"));

  // stuff for react router
  app.use(express.static(path.resolve(__dirname, "build")));

  /* 1. on every request that comes in - display single page app
  it doesnt need to talk to the server or anything like that (yet)
  you could use some caching here for example.
  2. we only mounted that in production build, dev will return 404
  check $node src/server.js
   */
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

if (dev) {
  app.use(morgan("dev"));
}

const server = createServer(app);

server.listen(PORT, err => {
  if (err) throw err;

  console.log("Server started.");
});
