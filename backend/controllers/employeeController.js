const Employee = require('../models/Employee');

// @desc    Get all employees with filtering, searching, and sorting
// @route   GET /api/employees
const getEmployees = async (req, res, next) => {
  try {
    const { search, status, department, sort } = req.query;

    const query = {};

    // Status filter
    if (status && status !== 'All') {
      query.status = status;
    }

    // Department filter
    if (department && department !== 'All') {
      query.department = department;
    }

    // Search filter across name, email, designation
    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { name: searchRegex },
        { email: searchRegex },
        { designation: searchRegex },
        { phone: searchRegex },
      ];
    }

    // Sorting
    let sortOption = { createdAt: -1 }; // Default: newest first
    if (sort === 'name_asc') sortOption = { name: 1 };
    else if (sort === 'name_desc') sortOption = { name: -1 };
    else if (sort === 'date_asc') sortOption = { joiningDate: 1 };
    else if (sort === 'date_desc') sortOption = { joiningDate: -1 };

    const employees = await Employee.find(query).sort(sortOption);

    res.status(200).json({
      success: true,
      count: employees.length,
      data: employees,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single employee by ID
// @route   GET /api/employees/:id
const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: `Employee not found with id: ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new employee
// @route   POST /api/employees
const createEmployee = async (req, res, next) => {
  try {
    const { name, email, phone, department, designation, joiningDate, status } = req.body;

    // Check if email already exists
    const existingEmployee = await Employee.findOne({ email: email?.toLowerCase().trim() });
    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: 'An employee with this email address already exists',
      });
    }

    const employee = await Employee.create({
      name,
      email,
      phone,
      department,
      designation,
      joiningDate,
      status: status || 'Active',
    });

    res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update employee
// @route   PUT /api/employees/:id
const updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone, department, designation, joiningDate, status } = req.body;

    // Check if employee exists
    let employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: `Employee not found with id: ${id}`,
      });
    }

    // If email is changing, check if another employee has this email
    if (email && email.toLowerCase().trim() !== employee.email) {
      const emailExists = await Employee.findOne({
        email: email.toLowerCase().trim(),
        _id: { $ne: id },
      });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: 'An employee with this email address already exists',
        });
      }
    }

    employee = await Employee.findByIdAndUpdate(
      id,
      {
        name,
        email,
        phone,
        department,
        designation,
        joiningDate,
        status,
      },
      {
        returnDocument: 'after',
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: 'Employee updated successfully',
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete employee
// @route   DELETE /api/employees/:id
const deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: `Employee not found with id: ${id}`,
      });
    }

    await Employee.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Employee deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get dashboard metrics / stats
// @route   GET /api/employees/stats/summary
const getEmployeeStats = async (req, res, next) => {
  try {
    const total = await Employee.countDocuments();
    const active = await Employee.countDocuments({ status: 'Active' });
    const inactive = await Employee.countDocuments({ status: 'Inactive' });

    // Distinct departments count
    const departments = await Employee.distinct('department');

    res.status(200).json({
      success: true,
      data: {
        total,
        active,
        inactive,
        departmentsCount: departments.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeStats,
};
