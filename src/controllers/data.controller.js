const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");
const DataModel = require("../models/data.model");
const Staff = require("../models/staff.model");
const Achievement = require("../models/achievement.model");
const Target = require("../models/target.model")

/**
 * Handles Excel file upload and returns JSON.
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */


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


async function saveTargetToMongoDB(dataArray){
  try{
    const staffList = await Staff.find();
    const branchList = dataArray;

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

    const inserted = await Target.insertMany(result);
  }
  catch(err){
    console.log("Error inserting data :", err);
  }
}

// Function to save data
async function saveExcelDataToMongo(dataArray) {
  try {
    const inserted = await DataModel.insertMany(dataArray);
    console.log(`Inserted ${inserted.length} records successfully.`);
  } catch (err) {
    console.error("Error inserting data:", err);
  }
}

async function saveStaffExcelDataToMongo(dataArray) {
  try {
    const inserted = await Staff.insertMany(dataArray);
    console.log(`Inserted ${inserted.length} records successfully.`);
  } catch (err) {
    console.error("Error inserting data:", err);
  }
}

async function saveAchieveExcelDataToMongoDB(dataArray) {
  try {
    const inserted = await Achievement.insertMany(dataArray);
    console.log(`Inserted ${inserted.length} records successfully.`);
  } catch (err) {
    console.error("Error inserting data:", err);
  }
}

const uploadExcelController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = path.resolve(req.file.path);

    // Read the Excel file
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Use the first sheet
    const worksheet = workbook.Sheets[sheetName];

    // Convert sheet to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: null });

    // Save data to MongoDB
    await saveExcelDataToMongo(jsonData);

    await saveTargetToMongoDB(jsonData);

    // Delete uploaded file after processing
    fs.unlinkSync(filePath);

    //save data to mongodb
    return res
      .status(200)
      .json({ message: "File processed successfully", data: jsonData });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to process Excel file" });
  }
};

const uploadStaffExcelData = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = path.resolve(req.file.path);

    // Read the Excel file
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Use the first sheet
    const worksheet = workbook.Sheets[sheetName];

    // Convert sheet to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: null });

    console.log(jsonData[0]);

    // Save data to MongoDB
    await saveStaffExcelDataToMongo(jsonData);

    // Delete uploaded file after processing
    fs.unlinkSync(filePath);

    //save data to mongodb
    return res
      .status(200)
      .json({ message: "File processed successfully", data: jsonData });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to process Excel file" });
  }
};

const uploadAchieveExcelData = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = path.resolve(req.file.path);

    // Read the Excel file
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Use the first sheet
    const worksheet = workbook.Sheets[sheetName];

    // Convert sheet to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: null });

    console.log(jsonData[0]);

    // Save data to MongoDB
    await saveAchieveExcelDataToMongoDB(jsonData);

    // Delete uploaded file after processing
    fs.unlinkSync(filePath);

    //save data to mongodb
    return res
      .status(200)
      .json({ message: "File processed successfully", data: jsonData });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to process Excel file" });
  }
};

const getDataController = async (req, res) => {
  try {
    const data = await DataModel.find().sort({ _id: -1 });
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
};

const deleteData = async (req, res) => {
  try {
    const data = await DataModel.deleteMany();
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
};

module.exports = {
  uploadExcelController,
  getDataController,
  uploadStaffExcelData,
  uploadAchieveExcelData,
  deleteData,
};
