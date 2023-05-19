const mongoose = require("mongoose");
const validator = require("validator");
mongoose
  .connect("mongodb://localhost:27017/mydb", { useNewUrlParser: true })
  .then(() => {})
  .catch((err) => {
    throw err;
  });

const schema = mongoose.Schema({
  name: { type: String, required: true },
  stdID: { type: Number, required: true, unique: true },
  mail: { type: String,required: true,},
  done: { type: Boolean, default: false },
});

const Student = new mongoose.model("StudentEdu", schema);

module.exports = Student;
