const express = require("express")
const router = express.Router();
const medicinecontroller = require("../Controller/medicinecontroller");
const auth = require('../middleware/auth')


router.post("/getAllReminder", auth, medicinecontroller.getAllReminder)
router.post("/addreminder", auth, medicinecontroller.addReminder)
router.post("/deleteReminder", auth, medicinecontroller.deleteReminder)

module.exports = router;



