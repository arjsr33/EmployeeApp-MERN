import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, Button, TextField, Box } from '@mui/material';

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    id: '',
    name: '',
    username: '',
    email: '',
    address: { street: '', city: '', zipcode: '' },
    phone: '',
    company: { name: '' }
  });
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [view, setView] = useState('add'); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); 
    } else if (view === 'show') {
      fetchEmployees();
    }
  }, [view, navigate]);

  const fetchEmployees = async () => {
    const token = localStorage.getItem('token'); 
    try {
      const response = await axios.get('https://employee-app-mern-lyart.vercel.app/api/employees', {
        headers: { 'x-auth-token': token }
      });
      setEmployees(response.data);
    } catch (error) {
      console.error('There was an error fetching the employees!', error);
    }
  };

  const createEmployee = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); 
    try {
      const response = await axios.post('https://employee-app-mern-lyart.vercel.app/api/employees', newEmployee, {
        headers: { 'x-auth-token': token }
      });
      setEmployees([...employees, response.data]);
      setNewEmployee({
        id: '',
        name: '',
        username: '',
        email: '',
        address: { street: '', city: '', zipcode: '' },
        phone: '',
        company: { name: '' }
      });
    } catch (error) {
      if (error.response.status === 400 && error.response.data.message.includes('E11000 duplicate key error')) {
        alert('ID already exists');
      } else {
        console.error('There was an error creating the employee!', error);
      }
    }
  };

  const updateEmployee = async (e) => {
    e.preventDefault();
    if (!selectedEmployee) return;
    const token = localStorage.getItem('token'); 
    try {
      const response = await axios.patch(`https://employee-app-mern-lyart.vercel.app/api/employees/${selectedEmployee._id}`, selectedEmployee, {
        headers: { 'x-auth-token': token }
      });
      setEmployees(employees.map(emp => (emp._id === selectedEmployee._id ? response.data : emp)));
      setSelectedEmployee(null);
    } catch (error) {
      console.error('There was an error updating the employee!', error);
    }
  };

  const deleteEmployee = async (id) => {
    const token = localStorage.getItem('token'); 
    try {
      console.log(`Deleting employee with id: ${id}`);
      await axios.delete(`https://employee-app-mern-lyart.vercel.app/api/employees/${id}`, {
        headers: { 'x-auth-token': token }
      });
      setEmployees(employees.filter(employee => employee._id !== id)); 
    } catch (error) {
      console.error('There was an error deleting the employee!', error);
    }
  };

  return (
    <Container>
      <br />
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      </Box>
      <Box sx={{ mb: 4 }}>
        <Button variant="contained" color="primary" onClick={() => setView('add')} sx={{ mr: 2 }}>Add Employee</Button>
        <Button variant="contained" color="primary" onClick={() => setView('show')}>Show All Employees</Button>
      </Box>

      {view === 'add' && (
        <Box component="form" onSubmit={createEmployee} sx={{ mb: 4 }}>
          <Typography variant="h6">Add New Employee</Typography>
          <TextField label="ID" value={newEmployee.id} onChange={(e) => setNewEmployee({ ...newEmployee, id: e.target.value })} fullWidth required />
          <TextField label="Name" value={newEmployee.name} onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })} fullWidth required />
          <TextField label="Username" value={newEmployee.username} onChange={(e) => setNewEmployee({ ...newEmployee, username: e.target.value })} fullWidth required />
          <TextField label="Email" value={newEmployee.email} onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })} fullWidth required />
          <TextField label="Street" value={newEmployee.address.street} onChange={(e) => setNewEmployee({ ...newEmployee, address: { ...newEmployee.address, street: e.target.value } })} fullWidth required />
          <TextField label="City" value={newEmployee.address.city} onChange={(e) => setNewEmployee({ ...newEmployee, address: { ...newEmployee.address, city: e.target.value } })} fullWidth required />
          <TextField label="Zipcode" value={newEmployee.address.zipcode} onChange={(e) => setNewEmployee({ ...newEmployee, address: { ...newEmployee.address, zipcode: e.target.value } })} fullWidth required />
          <TextField label="Phone" value={newEmployee.phone} onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })} fullWidth required />
          <TextField label="Company Name" value={newEmployee.company.name} onChange={(e) => setNewEmployee({ ...newEmployee, company: { ...newEmployee.company, name: e.target.value } })} fullWidth required />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Add Employee</Button>
        </Box>
      )}

      {view === 'show' && (
        <Grid container spacing={3}>
          {employees.map(employee => (
            <Grid item xs={12} sm={6} md={4} key={employee._id}>
              <Card>
                <CardContent>
                  <Typography variant="h5">{employee.name}</Typography>
                  <Typography variant="body2">{employee.email}</Typography>
                  <Typography variant="body2">{employee.phone}</Typography>
                  <Typography variant="body2">{employee.address.street}, {employee.address.suite}, {employee.address.city}, {employee.address.zipcode}</Typography>
                  <Typography variant="body2">{employee.company.name}</Typography>
                  <Button variant="contained" color="primary" onClick={() => setSelectedEmployee(employee)}>
                    Edit
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => deleteEmployee(employee._id)} sx={{ ml: 2 }}>
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {selectedEmployee && (
        <Box component="form" onSubmit={updateEmployee} sx={{ mb: 4 }}>
          <Typography variant="h6">Update Employee</Typography>
          <TextField label="ID" value={selectedEmployee.id} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, id: e.target.value })} fullWidth required />
          <TextField label="Name" value={selectedEmployee.name} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, name: e.target.value })} fullWidth required />
          <TextField label="Username" value={selectedEmployee.username} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, username: e.target.value })} fullWidth required />
          <TextField label="Email" value={selectedEmployee.email} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, email: e.target.value })} fullWidth required />
          <TextField label="Street" value={selectedEmployee.address.street} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, address: { ...selectedEmployee.address, street: e.target.value } })} fullWidth required />
          <TextField label="City" value={selectedEmployee.address.city} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, address: { ...selectedEmployee.address, city: e.target.value } })} fullWidth required />
          <TextField label="Zipcode" value={selectedEmployee.address.zipcode} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, address: { ...selectedEmployee.address, zipcode: e.target.value } })} fullWidth required />
          <TextField label="Phone" value={selectedEmployee.phone} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, phone: e.target.value })} fullWidth required />
          <TextField label="Company Name" value={selectedEmployee.company.name} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, company: { ...selectedEmployee.company, name: e.target.value } })} fullWidth required />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Update Employee</Button>
          <Button variant="outlined" color="secondary" sx={{ mt: 2, ml: 2 }} onClick={() => setSelectedEmployee(null)}>Cancel</Button>
        </Box>
      )}
    </Container>
  );
};

export default AdminDashboard;
