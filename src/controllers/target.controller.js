const Staff = require("../models/staff.model.js");
const Data = require("../models/data.model.js");

function divideNumber(total, n) {
  const base = Math.floor(total / n); // base value for each part
  let remainder = total % n; // remaining value
  const result = Array(n).fill(base); // initialize array with base values

  // Add the remainder to the last elements
  for (let i = n - remainder; i < n; i++) {
    result[i] += 1;
  }

  return result;
}

function sumMonthsOnly(arrayOfStaffs) {
  const total = {};

  const months = [
    "Shrawan", "Bhadra", "Aswoj",
    "Kartik", "Mangsir", "Poush",
    "Magh", "Falgun", "Chaitra",
    "Baishak", "Jestha", "Ashar"
  ];

  months.forEach((month) => {
    total[month] = arrayOfStaffs.reduce(
      (sum, staff) => sum + (parseFloat(staff[month]) || 0),
      0
    ).toFixed(2);
  });

  const grandTotal = Object.values(total).reduce((sum, val) => sum + val, 0);

  return {...total, Total : Math.round(grandTotal)};
}
const getEmployeesTarget = async (req, res) => {
  try {
    var data = await Staff.find(
      {},
      {
        "Branch Name": 1,
        "Staff Code": 1,
        "Staff Name": 1,
        JobsType: 1,
        Indicator: 1,
      }
    );

    const result = await Data.aggregate([
      {
        $group: {
          _id: "$Branch", // Group by Branch Name
          perStaff1stQtr: { $first: "$Per Staff 1st Qtr" },
          perStaff2ndQtr: { $first: "$Per Staff 2nd Qtr" },
          perStaff3rdQtr: { $first: "$Per Staff 3rd Qtr" },
          perStaff4thQtr: { $first: "$Per Staff 4th Qtr" },
          perStaffTotal: { $first: "$Per Staff Total" },
          staffCount: { $first: "$Staff" },
        },
      },
    ]);

    const perMonthDataFieldStaff = result.map((branchData) => {


      var values1 = branchData.perStaff1stQtr / 3;
      var values2 = branchData.perStaff2ndQtr / 3;
      var values3 = branchData.perStaff3rdQtr / 3;
      var values4 = branchData.perStaff4thQtr / 3;

      var total = values1 * 3 + values2 * 3 + values3 * 3 + values4 * 3;

      return {
        branch: branchData._id,
        Shrawan: values1.toFixed(2),
        Bhadra: values1.toFixed(2),
        Aswoj: values1.toFixed(2),
        Kartik: values2.toFixed(2),
        Mangsir: values2.toFixed(2),
        Poush: values2.toFixed(2),
        Magh: values3.toFixed(2),
        Falgun: values3.toFixed(2),
        Chaitra: values3.toFixed(2),
        Baishak: values4.toFixed(2),
        Jestha: values4.toFixed(2),
        Ashar: values4.toFixed(2),
        Total: Math.round(total),
      };
    });

    const newData = data.map((value) => {
      var branch = perMonthDataFieldStaff.filter(
        (staff) => staff.branch === value["Branch Name"]
      )[0];

      if (value["JobsType"] === "Field Staff") {
        return {
          ...value._doc,
          ...branch,
        };
      } else {
        return {
          ...value._doc,
        };
      }
    });

    const dataWithManager = newData.map((value) => {

      if (value["JobsType"] === "Branch Manager") {
        console.log(value);
        var fieldStaffs = newData.filter(
          (staff) =>
            staff.branch === value["Branch Name"] &&
            staff["JobsType"] === "Field Staff"
        );

        var values = sumMonthsOnly(fieldStaffs);

        return {
          ...value,
          ...values
        }
      }else{
        return {...value}
      }
    });

    return res.status(200).json(dataWithManager);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
};

module.exports = {
  getEmployeesTarget,
};
