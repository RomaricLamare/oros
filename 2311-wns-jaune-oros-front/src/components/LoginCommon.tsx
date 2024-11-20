
import { Box, Button, TextField, Typography } from '@mui/material';
import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { LOGIN } from '@/requests/queries/auth.queries';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';

type TLoginCommonProps = {onCompleted: (data: any) => Promise<void>, showRegister: () => void }

function LoginCommon({onCompleted, showRegister}: TLoginCommonProps ){
  const router = useRouter();

   console.log('%c⧭', 'color: #ff0000', onCompleted);
   const  getUserInfos  = useAuth();
   const [formState, setFormState] = useState({
     email: '',
     password: '',
   });
 
   const [loginUser, { data, loading, error }] = useLazyQuery(LOGIN, {
     onCompleted: (data) => onCompleted(data),
     onError: (error) => {
       console.error("Mutation error:", error);
     },
   });
 
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
       const response = await loginUser({
         variables: {
           infos: {
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

     useEffect(() => {
    if (error) {
      alert("Informations de connexion incorrectes. Si vous n'avez pas de compte, veuillez vous inscrire.");
      showRegister();
    }
  }, [error, showRegister]);
 
   return (
     <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4, p: 2, border: '1px solid #ccc', borderRadius: 2, backgroundColor:'white' }}>
       <Typography variant="h4" style={{color:'black', textAlign:'center', marginBottom:'2rem'}}>Se connecter à votre compte</Typography>
       <form onSubmit={handleSubmit}>
         <TextField
           type="email"
           name="email"
           label="Email"
           value={formState.email}
           onChange={handleChange}
           required
           fullWidth
           margin="normal"
         />
         <TextField
           type="password"
           name="password"
           label="Password"
           value={formState.password}
           onChange={handleChange}
           required
           fullWidth
           margin="normal"
         />
         <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth style={{marginBottom:'2rem'}}>
           {loading ? 'Submitting...' : 'Login'}
         </Button>
         {error && <Typography style={{color:'red', textAlign:'center'}}>Aucun compte associé à cet email</Typography>}
       </form>
       <Typography onClick={() => showRegister()} style={{color:'black', textAlign:'center', cursor: 'pointer'}}>Vous ne possédez pas de compte ? Inscrivez-vous</Typography>
       {data && data.login.success && <Typography style={{color:'green', textAlign:'center'}}>Success! {data.login.message}</Typography>}
       {data && !data.login.success && <Typography style={{color:'red', textAlign:'center'}}>Mot de passe incorrect</Typography>}
     </Box>
   );
}

export default LoginCommon;