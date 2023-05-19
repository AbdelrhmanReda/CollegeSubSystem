const express = require("express"),
  app = express(),
  expressLayout = require("express-ejs-layouts"),
  users = require("./routes/users"),
  port = 4000,
  bodyParser = require("body-parser");
  const cookieParser = require('cookie-parser');

  app.use(cookieParser()); // Note the `()`
  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressLayout);

app.set("view engine", "ejs");
app.use("/", require("./routes/index"));
app.use("/users", users);
// app.use("/users/login",require("./routes/login"))
app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}...`);
});
