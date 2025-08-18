// First, install the xlsx package: npm install xlsx
const XLSX = require("xlsx");
const fs = require("fs");

/**
 * Converts an Excel file to JSON.
 * @param {string} filePath - Path to the Excel file.
 * @param {string} sheetName - Optional: Name of the sheet to convert. Defaults to first sheet.
 * @returns {Array<Object>} - JSON array representing the sheet data.
 */
function excelToJson(filePath, sheetName = null) {
  // Read the Excel file
  const workbook = XLSX.readFile(filePath);

  // Determine the sheet to read
  const targetSheetName = sheetName || workbook.SheetNames[0];
  const worksheet = workbook.Sheets[targetSheetName];

  // Convert sheet to JSON
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: null });

  return jsonData;
}

// Example usage:
const filePath = "./data.xlsx"; // Path to your Excel file
const jsonResult = excelToJson(filePath);

// Save to a JSON file
fs.writeFileSync("output.json", JSON.stringify(jsonResult, null, 2));

console.log("Excel converted to JSON successfully!");