const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  id: {
    type: String,
    min: 4,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
});
const tmpboard = new mongoose.model("tmpboard", schema);
module.exports = tmpboard;
