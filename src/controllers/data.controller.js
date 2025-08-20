const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");
const DataModel = require("../models/data.model");
const Staff = require("../models/staff.model");
const Achievement = require("../models/achievement.model");

/**
 * Handles Excel file upload and returns JSON.
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */

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
