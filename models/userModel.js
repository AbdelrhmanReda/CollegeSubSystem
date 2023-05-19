const mongoose = require("mongoose");
const validator = require("validator");
mongoose
  .connect("mongodb://localhost:27017/mydb", { useNewUrlParser: true })
  .then(() => {})
  .catch((err) => {
    throw err;
  });

const schema = mongoose.Schema({
  name: { type: String, required: true},
  stdId:{type:Number , required:true, unique:true },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (val) => {
        return validator.isEmail(val);
      },
    },
  },
  password: { type: String, default:"admin" },
  isAdmin:{ type: Boolean, default: false },
  done:{ type: Boolean, default: false }
});

const registerSchema = new mongoose.model("traversyUser", schema);

module.exports=  registerSchema