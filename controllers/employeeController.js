// controllers/employeeController.js

const Employee = require('../models/Employee');

// @desc    Create a new employee
// @route   POST /api/employees
const createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      data: employee,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all employees
// @route   GET /api/employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({
      success: true,
      message: 'Employees fetched successfully',
      data: employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single employee by ID
// @route   GET /api/employees/:id
const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Employee fetched successfully',
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update employee (full update)
// @route   PUT /api/employees/:id
const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // return the UPDATED document, not the old one
      runValidators: true, // re-run schema validation on update
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Employee updated successfully',
      data: employee,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Partially update employee
// @route   PATCH /api/employees/:id
const patchEmployee = async (req, res) => {
  // Mongoose's findByIdAndUpdate already only changes fields present in req.body,
  // so PATCH and PUT can share the same logic for our purposes.
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Employee updated successfully',
      data: employee,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete employee
// @route   DELETE /api/employees/:id
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Employee deleted successfully',
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  patchEmployee,
  deleteEmployee,
};