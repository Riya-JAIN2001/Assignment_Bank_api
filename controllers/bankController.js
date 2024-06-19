const Bank = require("../models/bankSchema");


const getAllBanks = async (req, res) => {
  try {
    const bank = await Bank.find();
    res.status(200).json({
      message: "Successfully get bank details",
      bank,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};


const getBranchDetails = async (req, res) => {
  const { bankName, branchName } = req.params;

  try {
    const bank = await Bank.findOne({ name: bankName });
    if (!bank) {
      
      return res.status(404).json({
        message: "Bank not found",
      });
    }

    
    const branch = bank.branches.find(
      (branch) => branch.branchName === branchName
    );
    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }

    
    res.status(200).json({ message: "Branch found", branch });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllBanks,
  getBranchDetails,
};
