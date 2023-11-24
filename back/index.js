const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("host", process.env.HOST || "0.0.0.0");

app.use(cors());
app.use(express.static(`${__dirname}/public`));
// app.use("/", routes);

app.listen(app.get("port"), app.get("host"), () =>
  console.log(`Server is running on port: ${app.get("port")}`)
);

module.exports = app;
