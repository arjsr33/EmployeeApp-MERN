import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, Grid, Typography, Button } from '@mui/material';

const Login = () => {
  return (
    <Container maxWidth="sm">
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={12}>
          <Box
            sx={{
              p: 4,
              border: '1px solid #ccc',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              width: '100%',
              maxWidth: 400,
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" component="h1" gutterBottom>
              Select Login Type
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Link to="/employee-login" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  Employee Login
                </Button>
              </Link>
              <Link to="/admin-login" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                >
                  Admin Login
                </Button>
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
