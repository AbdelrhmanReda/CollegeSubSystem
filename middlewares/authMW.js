const jwt = require("jsonwebtoken");
const config = require("config");
module.exports = (req, res, nxt) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).send("Access denied..");
  try {
    const decoded = jwt.verify(token, config.get("jwtsec"));
    if (!decoded.admin)
      return res.status(400).send("Access Denied . You have No Auutorization");
    nxt();
  } catch (error) {
    res.status(400).send("Error");
  }
};
