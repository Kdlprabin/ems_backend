const Staff = require("../models/staff.model");
const BranchData = require("../models/data.model");
const Target = require("../models/target.model");

// Split quarterly → months
function expandQuarterData(branch, isFieldStaff) {
  if (!branch) return {};

  if (isFieldStaff) {
    // Divide per branch values equally among 3 months
    return {
      Shrawan: (branch["Per Staff 1st Qtr"] || 0) / 3,
      Bhadra: (branch["Per Staff 1st Qtr"] || 0) / 3,
      Aswoj: (branch["Per Staff 1st Qtr"] || 0) / 3,

      Kartik: (branch["Per Staff 2nd Qtr"] || 0) / 3,
      Mangsir: (branch["Per Staff 2nd Qtr"] || 0) / 3,
      Poush: (branch["Per Staff 2nd Qtr"] || 0) / 3,

      Magh: (branch["Per Staff 3rd Qtr"] || 0) / 3,
      Falgun: (branch["Per Staff 3rd Qtr"] || 0) / 3,
      Chaitra: (branch["Per Staff 3rd Qtr"] || 0) / 3,

      Baishak: (branch["Per Staff 4th Qtr"] || 0) / 3,
      Jestha: (branch["Per Staff 4th Qtr"] || 0) / 3,
      Ashar: (branch["Per Staff 4th Qtr"] || 0) / 3,

      Total: branch["Per Staff Total"] || 0,
    };
  }

  return {}; // Branch Manager handled separately
}

const getEmployeesTarget =  async (req, res) => {
  try {

    const data = await Target.find();

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getEmployeesTarget
};
