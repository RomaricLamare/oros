import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { CREATE_RESERVATION } from '@/requests/mutations/reservations.mutations';
import { AuthContext } from "@/context/authProvider";

const CheckoutPage: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>('paypal');
  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();
  const { userInfos, refreshUserInfos } = useContext(AuthContext);
  const [createReservation, { loading: loadingReservation }] = useMutation(CREATE_RESERVATION);

  useEffect(() => {
    refreshUserInfos();
  }, [refreshUserInfos]);
  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
    router.push('/cart');
  };

  const handlePay = async () => {
    console.log(`Méthode de paiement choisie: ${paymentMethod}`);

    const startDate = userInfos?.session?.cart.startDate;
    const endDate =  userInfos?.session?.cart.endDate;
    const userId = userInfos?.id;
    const cartItems = userInfos?.session?.cart.cartItems || [];

    try {
      // Créer les réservations pour chaque article dans le panier
      for (const item of cartItems) {
        const infos = {
          start_date: startDate,
          end_date: endDate,
          user: { id: userId },
          material: [
            {
              id: item.materialId,
              qtty_reserved: item.quantity,
              price: item.price,
            }
          ],
        };

        const { data } = await createReservation({ variables: { infos } });
        console.log("Réservation créée avec succès :", data);
      }

        router.push('/confirmation'); 
      

    } catch (error) {
      console.error("Erreur lors de la création de la réservation ou de la réinitialisation du panier :", error);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unknown error occurred');
      }
      setOpen(true);
    }

  };

  // Calcul du nombre de jours entre startDate et endDate
  const startDate = new Date(userInfos?.session?.cart.startDate);
  const endDate = new Date(userInfos?.session?.cart.endDate);
  const numberOfDays = startDate && endDate ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) : 0;

// Calcul du prix total du panier
  const cart = userInfos?.session?.cart.cartItems || [];
  console.log(cart);
  const totalPrice = cart.reduce((total, item) => {
    const quantity = item.quantity;
    return total + item.price * quantity * numberOfDays;
  }, 0);

  const paymentOptionsStyle = {
  width: '799px',
  height: '10vh',
  left: '121px',
  top: '432px',
  marginBottom: '4vh',

  background: 'rgba(238, 238, 238, 0.933333)',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',

  }

  return (
    <Box sx={{ padding: '2rem', maxWidth: '600px', margin: 'auto', color:"black" }}>
      <Typography variant="h4" gutterBottom>Paiement</Typography>

      <FormControl component="fieldset">
        <FormLabel component="legend">Choisissez votre moyen de paiement :</FormLabel>
        <RadioGroup value={paymentMethod} onChange={handlePaymentChange}>
          <FormControlLabel value="paypal" control={<Radio />} label="PayPal" style={paymentOptionsStyle}/>
          <FormControlLabel value="creditCard" control={<Radio />} label="Carte Bancaire" style={paymentOptionsStyle} />
          <FormControlLabel value="googlePay" control={<Radio />} label="Google Pay" style={paymentOptionsStyle} />
        </RadioGroup>
      </FormControl>

      <Typography variant="h5" sx={{ marginTop: '2rem' }}>
        Récapitulatif
      </Typography>
      <Typography variant="h6">
        Prix total : {totalPrice}€
      </Typography>

      <Box sx={{ marginTop: '2rem' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePay}
          disabled={loadingReservation}
        >
          {loadingReservation ? 'Traitement...' : 'Payer'}
        </Button>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Stock insuffisant"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {errorMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CheckoutPage;