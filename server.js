const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect("mongodb+srv://murkutkaraniket:aniket1812@cluster0.fupvoqn.mongodb.net/exercise_tracker?retryWrites=true&w=majority&appName=Cluster0");

const UserSchema = new Schema({
  username: String,
});
const User = mongoose.model("User", UserSchema);

const ExerciseSchema = new Schema({
  userid: { type: String, requried: true },
  description: String,
  duration: Number,
  date: Date,
});
const Exercise = mongoose.model("Exercise", ExerciseSchema);

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/users", async (req, res) => {
  const users = await User.find({}).select("_id username");
  if (!users) {
    res.send("No users found");
  } else {
    res.json(users);
  }
});
app.post("/api/users", async (req, res) => {
  console.log(req.body);

  const userObj = new User({
    username: req.body.username,
  });

  try {
    const user = await userObj.save();
    console.log(user);
    let postHTML = `<h2>User Added: '${user.username}'</h2>
    <p>User ID: ${user._id}</p>`;
    const htmlContent = `
      <div class="container">
        ${postHTML}
      </div>
    `;
    res.send(htmlContent);
  } catch (err) {
    console.log(err);
  }
});


app.post("/api/users/:_id/exercises", async (req, res) => {
  const id = req.params._id;
  const { description, duration, date } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      res.send("User not found");
    } else {
      const exerciseObj = new Exercise({
        userid: user._id,
        description,
        duration,
        date: date ? new Date(date) : new Date()
      })
      const exercise = await exerciseObj.save();

      let postHTML = `<h2>Exercise Added for ${user.username}:</h2>`;
      postHTML += "<ul>";
      postHTML += `<li>Description: ${exercise.description}, Duration: ${exercise.duration}, Date: ${exercise.date.toDateString()}</li>`;
      postHTML += "</ul>";

      const htmlContent = `
       <div class="container">
      ${postHTML}
       </div>
      `;
      res.send(htmlContent);
    }
  } catch (err) {
    console.log(err);
  }
});


app.get("/api/users/:_id/logs", async (req, res) => {
  const { from, to, limit } = req.query;
  const id = req.params._id;
  const user = await User.findById(id);
  if (!user) {
    res.send("User not found");
    return;
  }
  let dateObj = {};
  if (from) {
    dateObj["$gte"] = new Date(from);
  }
  if (to) {
    dateObj["$lte"] = new Date(to);
  }
  let filter = {
    userid: id,
  };
  if (from || to) {
    filter.date = dateObj;
  }
  const exercises = await Exercise.find(filter).limit(+limit || 500);


  let logsHTML = `<h2>Exercise Logs for ${user.username}</h2>`;
  logsHTML += "<ul>";
  exercises.forEach((ex) => {
    logsHTML += `<li>Description: ${ex.description}, Duration: ${ex.duration}, Date: ${ex.date.toDateString()}</li>`;
  });
  logsHTML += "</ul>";


  const htmlContent = `
    <div class="container">
      ${logsHTML}
    </div>
  `;

  res.send(htmlContent);
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
