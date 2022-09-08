const mongoose = require("mongoose");
const dotennv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");
const DB = require("./model");
dotennv.config({ path: "./config.env" });
app.use(express.urlencoded());
app.use(cors());
app.use(express.json());
// Connecting to DB
const url = process.env.DATABASE;
const port = process.env.PORT || 3001;
mongoose
  .connect(url, {
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection Sucessfull of DB"))
  .catch((err) => console.log(err));
//*****************************************************************************************************************************************
app.post("/send/:ide", async (req, res) => {
  const value = req.body;

  console.log(value, req.params.ide);
  DB.findOne({ id: req.params.ide }, async (err, user) => {
    if (user) {
      res.send({ message: "Id Already Exist" });
    } else {
      const SchemaValue = new DB({
        id: req.params.ide,
        content: value.con,
      });
      SchemaValue.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Sucessfull", id: req.params.ide });
        }
      });
    }
  });
});
//**************************************************************************************************************************** */
app.get("/:id", async (req, res) => {
  console.log(req.params.id);
  const user = await DB.findOne({ id: req.params.id });
  if (user) {
    res.send({ content: user.content });
  } else {
    res.send({ message: "no content" });
  }
  delval(req.params.id);
});

async function delval(id) {
  await DB.deleteOne({ id: id });
}

if (process.env.NODE_ENV == "production") {
  app.use(express.static("frontend/build"));
}

const server = app.listen(port, () => {
  console.log("Connection Sucessfull at " + 3001);
});
