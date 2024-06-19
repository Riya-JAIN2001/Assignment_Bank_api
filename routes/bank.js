const express = require("express");
const {
  getAllBanks,
  getBranchDetails,
} = require("../controllers/bankController");
const router = express.Router();

// Get All banks
router.get("/", getAllBanks);

// Get branch details for a specific bank
router.get("/:bankName/branches/:branchName", getBranchDetails);

module.exports = router;
