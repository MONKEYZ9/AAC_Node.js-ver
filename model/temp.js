const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tempSchema = new Schema({
  title: String,
  temp: String,
  humidity: String,
  publishedDate: String,
  location : String,
});

module.exports = mongoose.model("temp", tempSchema);
