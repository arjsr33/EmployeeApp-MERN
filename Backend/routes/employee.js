const express = require('express');
const Employee = require('../models/Employee');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all employees
router.get('/', auth, async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one employee
router.get('/:id', auth, async (req, res) => {
  try {
    const employee = await Employee.findOne({ id: req.params.id });
    if (employee == null) {
      return res.status(404).json({ message: 'Cannot find employee' });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create an employee
router.post('/', auth, async (req, res) => {
  console.log('Request Body:', req.body); // Log request body for debugging
  const employee = new Employee({
    id: req.body.id,
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
    company: req.body.company
  });

  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    console.error('Error creating employee:', err.message); // Log error message for debugging
    res.status(400).json({ message: err.message });
  }
});

// Update an employee
router.patch('/:id', auth , async (req, res) => {
  try {
    const updates = req.body;
    console.log('Updating employee with id:', req.params.id, 'with data:', updates);

    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Cannot find employee' });
    }

    Object.keys(updates).forEach(key => {
      employee[key] = updates[key];
    });

    const updatedEmployee = await employee.save();
    res.json(updatedEmployee);
  } catch (err) {
    console.error('Error updating employee:', err);
    res.status(400).json({ message: err.message });
  }
});
// Delete an employee
router.delete('/:id', auth, async (req, res) => {
  try {
    console.log(`Deleting employee with id: ${req.params.id}`);
    const employee = await Employee.findById(req.params.id); // Corrected line
    if (!employee) {
      return res.status(404).json({ message: 'Cannot find employee' });
    }

    await employee.deleteOne();
    res.json({ message: 'Deleted Employee' });
  } catch (err) {
    console.error('Error deleting employee:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
