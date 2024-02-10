const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(cors());
app.use(express.json());

const Port = process.env.port || 8080;

const mongooses = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/useroffice");
  console.log("Database Connected");
};

mongooses();

const officeSchema = mongoose.Schema({
  username:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
  }
});

const officeModel = mongoose.model("officeStaff", officeSchema);
app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

app.post("/", async (req, res) => {
    try{
  const alexists = await officeModel.findOne({ username: req.body.username });

  if (alexists) {
    return res.json({ message: "User Already exists" });
  } else {
     res.json({ message: "" });
  }

  const Users = await new officeModel();
  Users.username = req.body.username;
  Users.password = req.body.password;
  await Users.save();

  res.send({ message: "Sucessful" });
}catch(err){
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" })
}});

app.listen(Port, () => {
  console.log(`Server started ${Port}`);
});
