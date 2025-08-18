const Data = require('../models/data.model');

const getBranch = async (req, res) => {
    try {
        //fetch data having unique branch name
        const branches = await Data.distinct("Branch")

        return res.status(200).json(branches);
    }catch(err){
        console.error(err);
        return res.status(500).json({ error: "Failed to fetch branch data" });
    }
}

module.exports = {
    getBranch
};