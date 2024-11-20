import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER } from '@/requests/mutations/auth.mutations';
import { Button, TextField, Grid, Typography, Box, Alert } from '@mui/material';
import { useRouter } from 'next/router';

const Register: React.FC = () => {

    const router = useRouter()

  const [formState, setFormState] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [createUser, { data, loading, error }] = useMutation(REGISTER, {
    onCompleted: (data) => {
      console.log("Mutation completed:", data);
      showLogin();
    },
    onError: (error) => {
     console.error("Mutation error:", error);
      if (error.message.includes("duplicate key value violates unique constraint")) {
        setErrorMessage("Ce compte existe déjà.");
      } else {
        setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
      }
    }
  });

  const showLogin = () => {
    router.push("/auth/login")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createUser({
        variables: {
          infos: {
            firstname: formState.firstname,
            lastname: formState.lastname,
            email: formState.email,
            password: formState.password,
          },
        },
      });
      console.log("Response from server:", response);
    } catch (e) {
      console.error("Submission error:", e);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4, p: 2, border: '1px solid #ccc', borderRadius: 2, backgroundColor:'white' }}>
      <Typography variant="h4" component="h2" gutterBottom style={{color:'black', textAlign:'center', marginBottom:'2rem'}}>
        Créer un compte
      </Typography>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="First Name"
              name="firstname"
              value={formState.firstname}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Last Name"
              name="lastname"
              value={formState.lastname}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth style={{marginBottom:'2rem'}}>
              {loading ? 'Submitting...' : 'Register'}
            </Button>
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Typography color="error">Error: {error.message}</Typography>
            </Grid>
          )}
        </Grid>
      </form>
      <Typography onClick={showLogin} style={{color:'black', textAlign:'center', cursor: 'pointer'}}>Vous avez déjà un compte?</Typography>
      {data && (
        <Typography color="success" sx={{ mt: 2 }} style={{color:'green'}}>
          Success! User {data.createUser.email} created.
        </Typography>
      )}
    </Box>
  );
};

export default Register;
