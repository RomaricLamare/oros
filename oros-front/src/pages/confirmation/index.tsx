import React, { useContext, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { RESET_CART } from '@/requests/mutations/session.mutation';
import { AuthContext } from "@/context/authProvider";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Button,
} from '@mui/material';


const ConfirmationPage: React.FC = () => {
  const { userInfos, refreshUserInfos } = useContext(AuthContext);
  const [resetCart] = useMutation(RESET_CART);

  useEffect(() => {
    refreshUserInfos();
  }, [refreshUserInfos]);
  
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  // Utiliser useEffect pour réinitialiser le panier à l'affichage de la page
  useEffect(() => {
    if (userInfos?.session?.id) {
      resetCart({ variables: { sessionId: userInfos.session.id } })
        .then(() => console.log("Panier réinitialisé avec succès"))
        .catch((error) => console.error("Erreur lors de la réinitialisation du panier:", error));
    }
  }, [userInfos, resetCart]);

  const cart = userInfos?.session?.cart;
  const cartItems = cart?.cartItems || [];

  return (
    <Box sx={{ padding: 4, textAlign: 'center', color: "black" }}>
      <Typography variant="h5" gutterBottom>
        Réservation confirmée !
      </Typography>

      <List>
        {cartItems.map((item: any, index: number) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  variant="square"
                  src={item.image}
                  alt={item.name}
                  sx={{ width: 80, height: 80 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={item.name}
                secondary={`Dates : du ${formatDate(cart?.startDate)} au ${formatDate(cart?.endDate)}`}
                sx={{ marginLeft: 2 }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography>Nom: {item.name}</Typography>
                <Typography>Quantité: {item.quantity}</Typography>
              </Box>
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>

      <Button href="/" color="primary" sx={{ marginTop: 2 }}>
        Accueil
      </Button>
    </Box>
  );
};

export default ConfirmationPage;