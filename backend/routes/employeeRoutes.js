const express = require("express");
const router = express.Router();
const {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeStats,
} = require("../controllers/employeeController");

// Stats summary endpoint (must be before :id route)
router.get("/stats/summary", getEmployeeStats);

// Main CRUD routes
router.route("/").get(getEmployees).post(createEmployee);

router
  .route("/:id")
  .get(getEmployeeById)
  .put(updateEmployee)
  .delete(deleteEmployee);

module.exports = router;
