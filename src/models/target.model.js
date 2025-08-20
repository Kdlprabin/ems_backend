const mongoose = require('mongoose');

const targetSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  "Branch Name" : {
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
  "JobsType": {
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
  "Total": {
    type: Number,
    required: false,
    default: 0,
  },
});

const Target = mongoose.model('Target', targetSchema);

module.exports = Target;