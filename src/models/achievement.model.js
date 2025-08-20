const mongoose = require("mongoose");

const achievementSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  "Branch" : {
    type: String,
    required: true,
  },
  "Staff Code": {
    type: String,
    required: true,
  },
  "Staff Name": {
    type: String,
    required: true,
  },
  "Job Type": {
    type: String,
    required: true,
  },
  Indicator: {
    type: String,
    required: true,
  },
  Shrawan: {
    type: Number,
    required: false,
    default: 0,
  },
  Bhadra: {
    type: Number,
    required: false,
    default: 0,
  },
  Aswoj: {
    type: Number,
    required: false,
    default: 0,
  },
  Kartik: {
    type: Number,
    required: false,
    default: 0,
  },
  Mangsir: {
    type: Number,
    required: false,
    default: 0,
  },
  Poush: {
    type: Number,
    required: false,
    default: 0,
  },
  Magh: {
    type: Number,
    required: false,
    default: 0,
  },
  Falgun: {
    type: Number,
    required: false,
    default: 0,
  },
  Chaitra: {
    type: Number,
    required: false,
    default: 0,
  },
  Baishak: {
    type: Number,
    required: false,
    default: 0,
  },
  Jestha: {
    type: Number,
    required: false,
    default: 0,
  },
  Ashar: {
    type: Number,
    required: false,
    default: 0,
  },
  "Total Target": {
    type: Number,
    required: false,
    default: 0,
  },
});

const Achievement = mongoose.model("Achievement", achievementSchema);

module.exports = Achievement;
