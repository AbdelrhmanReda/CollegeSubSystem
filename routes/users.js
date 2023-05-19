const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
const jwt = require("jsonwebtoken");
const config = require("config");
const multer = require("multer");
const auth = require("../middlewares/authMW");

router.get("/register", (req, res) => {
  res.render("register");
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/getstudent", (req, res) => {
  res.render("getStudent");
});
router.get("/addNew", (req, res) => {
  res.render("addNew");
});
router.get("/toggle", (req, res) => {
  res.render("changeState");
});
router.get("/uploadfile" , (req,res)=>{
  res.render("uploadfile")
})
router.post("/toggle", auth, controller.toggleStudent);
router.post("/register", auth, controller.createStudents);
router.post("/getstudent", controller.getStudent);

let upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "../traversy media passport/uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

router.post("/uploadfile",upload.single("file"),auth, controller.uploadFile);

//login handler
router.post("/login", async (req, res) => {
  try {
    let user = await loginModel.findOne({ email: req.body.email }).exec();
    console.log(user);
    if (!user || user.isAdmin === false) res.status(400).send("Invalid Email");
    // let password = await bcrypt.compare(req.body.password, user.password); // compare(Plain Password , hashed password)
    if (!req.body.password || req.body.password != user.password)
      res.status(400).send("Invalid Email or Password");
    if (!config.get("jwtsec")) return res.status(500).send("bad Request");

    const token = jwt.sign(
      { id: user._id, admin: user.isAdmin },
      config.get("jwtsec")
    );
    console.log(token);
    return res
      .header("1st-token", token)
      .cookie("token", token)
      .status(200)
      .render("dashboard");
  } catch (err) {
    for (e in err.errors) console.log(`Errors ${err.errors[e].message}`);
  }
});
module.exports = router;
