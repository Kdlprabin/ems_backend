const Staff = require("../models/staff.model.js");

const login = async (req, res) => {
  const default_username = "RKlohoni";
  const default_password = "12345";

  const {password, username} = req.body; 

  if(username === default_username && password === default_password){
    res.status(200).json({message: "login success", isLoggedIn: true})
  }

  res.status(401).json({message: "Invalid Credentials", isLoggedIn: false})
};

const register = async (req, res) => {};

const getStaffData = async (req, res) => {
  try {
    const data = await Staff.find();
    console.log(data[0]);
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

const getStaffNamesByBranch = async(req, res) => {
  try{
     const { branchName } = req.body

    const data = await Staff.distinct("Staff Name", { "Branch Name": branchName });

    console.log({branchName: req, data});

    return res.status(200).json(data)
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
}

const deleteStaff = async (
  req, res
) => 
  {
    try{
      const data = await Staff.deleteMany();
      return res.status(200).json(data)
  }
  catch(err){
    console.error(err)
    return res.status(500).json({error: "Failed to fetch data"})
  }
}

module.exports = {
  login,
  register,
  getStaffData,
  getStaffNames,
  getStaffNamesByBranch,
  deleteStaff
};
