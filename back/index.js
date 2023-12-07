const express = require("express");
const path = require("path");
const cors = require("cors");

const routes = require("./routes");

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("host", process.env.HOST || "0.0.0.0");

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("back server is loading...");
});

app.use("/api", routes);

app.listen(app.get("port"), app.get("host"), () =>
  console.log(`Server is running on port: ${app.get("port")}`)
);

module.exports = app;
