require("./models/User");
require("./models/Track");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth.routes");
const trackRoutes = require("./routes/track.routes");

const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri =
  "mongodb+srv://user:pass@cluster0.***.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.log("Error connectiong to Mongo", err);
});


app.get("/", requireAuth, (req, res) => {
  res.send(`Hi there! ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
