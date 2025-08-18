const Staff = require("../models/staff.model.js");

const login = async (req, res) => {};

const register = async (req, res) => {};

const getStaffData = async (req, res) => {
  try {
    const data = await Staff.find();
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
};

const getStaffNames = async (req, res) => {
  try{
    const data = await Staff.distinct("Staff Name");

    return res.status(200).json(data)
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
}

module.exports = {
  login,
  register,
  getStaffData,
  getStaffNames
};
