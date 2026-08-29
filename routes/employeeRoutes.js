// routes/employeeRoutes.js

const express = require('express');
const router = express.Router();

const {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  patchEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');

router.route('/').post(createEmployee).get(getEmployees);

router
  .route('/:id')
  .get(getEmployeeById)
  .put(updateEmployee)
  .patch(patchEmployee)
  .delete(deleteEmployee);

module.exports = router;