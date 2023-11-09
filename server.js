// server.js
require("dotenv").config();
const mongoUri = process.env.NEXT_PRIVATE_MONGODB_URL;
console.log("mongoUri: ", mongoUri);
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const { createNotifs } = require("./services/notification");
const { createServer } = require("http");
const { parse } = require("url");
const mongoose = require("mongoose");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;
    if (pathname === "/a") {
      app.render(req, res, "/a", query);
    } else if (pathname === "/b") {
      app.render(req, res, "/b", query);
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(port, (err) => {
    if (err) throw err;
    mongoose
      .connect(mongoUri, mongoOptions)
      .then(() => {
        console.log("MongoDB connected");
        createNotifs();
      })
      .catch((err) => console.log(err));
    console.log(`> Ready on ${NEXT_API_URL}:${port}`);
  });
});
