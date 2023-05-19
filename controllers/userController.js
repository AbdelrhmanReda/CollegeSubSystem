// const bcrypt= require("bcrypt")
// const auth = require("../middlewares/authMW")
const csvtoJson = require("csvtojson");
const user = require("../models/student");

let createStudents = async (req, res) => {
  let std = await user.findOne({ mail: req.body.mail }).exec();

  if (std) {
    return res.status(400).send("the user already registerd");
  }
  std = new user({
    name: req.body.name,
    stdID: req.body.stdID,
    mail: req.body.mail,
  });
  await std.save();
  res.send("تم اضافه الطالب");
};
let toggleStudent = async(req,res) =>{
  let std = await user.findOne({ stdID: req.body.stdID }).exec();
  console.log(std)

  if (!std) res.send("الطالب غير مسجل");
  else if (!std.done) {
    std.done = true;
    await std.save();
    res.send("تم تعديل الحالة");
  } else {
    res.send("الطالب ادي التربية العسكرية بالفعل");
  }
}


let getAllStudents = async (req, res) => {
  let std = await user.find(req);
  console.log(std);
};
let getStudent = async (req, res) => {
  try {
    let std = await user.findOne({ stdID: req.body.stdID }).exec();
    console.log(std);
    if (!std || !std.done) res.send("لم يتم اداء التربية العسكرية");
    else res.send("تم اداء التربية العسكرية");
    // else res.send(std);
  } catch (error) {
    res.send("ارجع يلا");
  }
};

let uploadFile = async (req, res) => {
  csvtoJson()
    .fromFile(req.file.path)
    .then((jsonObj) => {
      let bulk = [];
      for (let i = 0; i < jsonObj.length; i++) {
        let obj = {};
        obj.name = jsonObj[i]["name"];
        obj.stdID = jsonObj[i]["stdID"];
        obj.mail = jsonObj[i]["mail"];
        obj.done = jsonObj[i]["done"];
        bulk.push(obj);
      }
      user
        .insertMany(bulk)
        .then(function () {
          res.status(200).send({
            message: "Successfully Uploaded!",
          });
        })
        .catch(function (error) {
          res.status(500).send({
            message: "failure",
            error,
          });
        });
    })
    .catch((error) => {
      res.status(500).send({
        message: "failure",
        error,
      });
    });
};

module.exports = {
  createStudents,
  getAllStudents,
  getStudent,
  uploadFile,
  toggleStudent
};
