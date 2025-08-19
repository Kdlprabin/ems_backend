const Staff = require("../models/staff.model");
const BranchData = require("../models/data.model");

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
    const staffList = await Staff.find();
    const branchList = await BranchData.find();

    // Precompute field staff totals per branch+indicator
    let branchFieldTotals = {};

    staffList.forEach((staff) => {
      if (staff.JobsType === "Field Staff") {
        const branch = branchList.find(
          (b) => b.Branch === staff["Branch Name"] && b.Category === staff.Indicator
        );

        const monthData = expandQuarterData(branch, true);

        const key = `${staff["Branch Name"]}-${staff.Indicator}`;
        if (!branchFieldTotals[key]) {
          branchFieldTotals[key] = {
            Shrawan: 0, Bhadra: 0, Aswoj: 0,
            Kartik: 0, Mangsir: 0, Poush: 0,
            Magh: 0, Falgun: 0, Chaitra: 0,
            Baishak: 0, Jestha: 0, Ashar: 0,
            Total: 0
          };
        }

        // accumulate
        Object.keys(monthData).forEach((m) => {
          branchFieldTotals[key][m] += monthData[m];
        });
      }
    });

    // Now build final response
    const result = staffList.map((staff) => {
      const branch = branchList.find(
        (b) => b.Branch === staff["Branch Name"] && b.Category === staff.Indicator
      );

      let monthData = {};

      if (staff.JobsType === "Field Staff") {
        monthData = expandQuarterData(branch, true);
      } else if (staff.JobsType === "Branch Manager") {
        const key = `${staff["Branch Name"]}-${staff.Indicator}`;
        monthData = branchFieldTotals[key] || {};
      }

      return {
        "Branch Name": staff["Branch Name"],
        "Staff Code": staff["Staff Code"],
        "Staff Name": staff["Staff Name"],
        "JobsType": staff["JobsType"],
        "Indicator": staff["Indicator"],
        ...monthData,
      };
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getEmployeesTarget
};
