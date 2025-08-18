const mongoose = require("mongoose");

const BranchDataSchema = new mongoose.Schema({
  "S.N": { type: Number, required: true },
  "Branch": { type: String, required: true },
  "Category": { type: String, required: true },
  "Previous Years": { type: Number, required: false, default: 0 },
  "Target 1st Qtr": { type: Number, required: false, default: 0 },
  "Target 2nd Qtr": { type: Number, required: false, default: 0 },
  "Target 3rd Qtr": { type: Number, required: false, default: 0 },
  "Target 4th Qtr": { type: Number, required: false, default: 0 },
  "Target Total": { type: Number, required: false, default: 0 },
  "Per Branch 1st Qtr": { type: Number, required: false, default: 0 },
  "Per Branch 2nd Qtr": { type: Number, required: false, default: 0 },
  "Per Branch 3rd Qtr": { type: Number, required: false, default: 0 },
  "Per Branch 4th Qtr": { type: Number, required: false, default: 0 },
  "Per Branch Total": { type: Number, required: false, default: 0 },
  "Per Staff 1st Qtr": { type: Number, required: false, default: 0 },
  "Per Staff 2nd Qtr": { type: Number, required: false, default: 0 },
  "Per Staff 3rd Qtr": { type: Number, required: false, default: 0 },
  "Per Staff 4th Qtr": { type: Number, required: false, default: 0 },
  "Per Staff Total": { type: Number, required: false, default: 0 },
  "Staff": { type: Number, required: false, default: 0 }
});

module.exports = mongoose.model("BranchData", BranchDataSchema);
