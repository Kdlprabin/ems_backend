const Staff = require("../models/staff.model.js");

const login = async (req, res) => {};

const register = async (req, res) => {};

const getStaffData = async (req, res) => {
  try {
    const data = await Staff.aggregate([
       {
        $group: {
          _id: { staffName: "$Staff Name", branchName: "$Branch Name" },
        },
      },
      {
        $project: {
          _id: 0,
          staffName: "$_id.staffName",
          branchName: "$_id.branchName",
        },
      },
    ]);
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
};

module.exports = {
  login,
  register,
  getStaffData
};
