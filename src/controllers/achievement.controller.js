const Achieve = require("../models/achievement.model");

const getAchieveData = async (req, res) => {
  try {
    const data = await Achieve.find();
    console.log(data[0]);
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
};

const deleteAchieve = async (
  req, res
) => 
  {
    try{
      const data = await Achieve.deleteMany();
      return res.status(200).json(data)
  }
  catch(err){
    console.error(err)
    return res.status(500).json({error: "Failed to fetch data"})
  }
}

module.exports = {
  getAchieveData,
  deleteAchieve
};
