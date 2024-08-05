const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  zipcode: { type: String, required: true }
});

const companySchema = new mongoose.Schema({
  name: { type: String, required: true }
});

const employeeSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: addressSchema, required: true },
  phone: { type: String, required: true },
  company: { type: companySchema, required: true }
});

const Employee = mongoose.model('employee', employeeSchema);

module.exports = Employee;
