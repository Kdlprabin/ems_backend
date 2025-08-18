const mongoose = require('mongoose');

const staffSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  "Branch Name": { type: String, required: false }, // e.g. BHATEDADA BRANCH
  "Staff Code": { type: Number, required: false }, // e.g. 1280
  "Staff Name": { type: String, required: false }, // e.g. Amar Thapa Magar
  "Post": { type: String, required: false }, // e.g. Junior Assistant
  "Jobstype": { type: String, required: false }, // e.g. Field Staff
  "Monitoring": { type: String, required: false }, // e.g. Reshuka Thing
  "Monitoring Post": { type: String, required: false }, // e.g. Branch Manager
  "Indicator": { type: String, required: false }, // e.g. Member / Loanee
  "Full Marks": { type: Number, required: false }, // e.g. 10

  // Nepali headers (all as String since they are text fields)
  "शाखाको नाम": { type: String, required: false }, // e.g. भटेडाँडा ललितपुर
  "कर्मचारीको नाम": { type: String, required: false }, // e.g. अमर थापा मगर
  "पद": { type: String, required: false }, // e.g. कनिष्ठ सहायक
  "सुपरिवेक्षक": { type: String, required: false }, // e.g. रेशुका थिङ
  "कामको प्रकार": { type: String, required: false }, // e.g. शाखा प्रमुख
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;