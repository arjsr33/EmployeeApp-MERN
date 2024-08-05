import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EmployeeDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); 
    } else {
      axios.get('http://localhost:5000/api/employees', {
        headers: { 'x-auth-token': token }
      })
        .then(response => {
          setEmployees(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the employees!', error);
        });
    }
  }, [navigate]);

  return (
    <Container>
      <br />
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" gutterBottom>Employee Dashboard</Typography>
      </Box>
      <Grid container spacing={3}>
        {employees.map(employee => (
          <Grid item xs={12} sm={6} md={4} key={employee._id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{employee.name}</Typography>
                <Typography variant="body2">{employee.email}</Typography>
                <Typography variant="body2">{employee.phone}</Typography>
                <Typography variant="body2">{employee.address.street}, {employee.address.city}</Typography>
                <Typography variant="body2">{employee.company.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default EmployeeDashboard;
