import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography, Button, Grid, Paper, TextField } from '@mui/material';
import Image from 'next/image';
import { useMutation } from '@apollo/client';
import { REMOVE_CART_ITEM, UPDATE_MANY_CART } from '@/requests/mutations/session.mutation';
import { useRouter } from "next/router";
import { AuthContext } from "@/context/authProvider";

const CartPage: React.FC = () => {
  const router = useRouter();
  const [updateManyCart] = useMutation(UPDATE_MANY_CART);
  const [removeCartItem] = useMutation(REMOVE_CART_ITEM);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { userInfos, refreshUserInfos } = useContext(AuthContext);

  useEffect(() => {
    refreshUserInfos();
  }, [refreshUserInfos]);

  const cart = userInfos?.session?.cart.cartItems || [];

  const handleQuantityChange = (materialId: string, newQuantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [materialId]: newQuantity,
    }));
  };

  const handleUpdateQuantity = async (materialId: string) => {
    const sessionId = userInfos?.session?.id;
    const newQuantity = quantities[materialId] || 1;

    try {
      await updateManyCart({
        variables: {
          sessionId,
          materialId,
          quantity: newQuantity,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        },
      });
      alert(`Quantité mise à jour à ${newQuantity}`);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la quantité :", error);
    }
  };

    const handleRemoveCartItem = async (materialId: string) => {
    const sessionId = userInfos?.session?.id;

    try {
      await removeCartItem({
        variables: {
          sessionId,
          materialId,
        },
      });
      await refreshUserInfos();
      alert('Article supprimé du panier');
    } catch (error) {
      console.error("Erreur lors de la suppression de l'article :", error);
    }
  };

  const handleProceedToCheckout = async () => {
    const sessionId = userInfos?.session?.id;

    // Structure des items du panier pour la mutation
    const cartItems = cart.map(item => ({
      materialId: item.materialId,
      quantity: quantities[item.materialId] || item.quantity,
      name: item.name,
      description: item.description,
      image: item.image,
      initial_stock: item.initial_stock,
      price: item.price,
      slug: item.slug,
    }));

    console.log(cartItems)
    try {
      await updateManyCart({
        variables: {
          sessionId,
          cartItems,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        },
      });
      alert("Panier mis à jour avec les nouvelles dates et items");
      router.push("/checkout"); // Rediriger vers la page de paiement
    } catch (error) {
      console.error("Erreur lors de la mise à jour du panier :", error);
      alert("Une erreur s'est produite lors de la mise à jour du panier.");
    }
  };

    // Calcul du nombre de jours entre startDate et endDate
  const numberOfDays = startDate && endDate ? Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24)) : 0;

  // Calcul du prix total du panier
  const totalPrice = cart.reduce((total, item) => {
    const quantity = quantities[item.materialId] || item.quantity;
    return total + item.price * quantity * numberOfDays;
  }, 0);

  return (
    <Box sx={{ padding: '2rem'}}>
      <Typography variant="h4" gutterBottom>Mon Panier</Typography>

      <Box sx={{ marginBottom: '2rem' }}>
        <Typography variant="body1" style={{ color: "black" }}>Date de début</Typography>
        <TextField
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          sx={{ width: "33%", marginBottom: "1rem" }}
        />

        <Typography variant="body1" style={{ color: "black" }}>Date de fin</Typography>
        <TextField
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          sx={{ width: "33%", marginBottom: "1rem" }}
        />
      </Box>

      {cart.length === 0 ? (
        <Typography variant="body1">Votre panier est vide.</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {cart.map((item) => (
              <Grid item xs={12} md={6} lg={4} key={item.materialId}>
                <Paper elevation={3} sx={{ padding: '1rem', textAlign: 'center' }}>
                  <Typography variant="h6" gutterBottom>{item.name}</Typography>
                  <Box sx={{ marginBottom: '1rem' }}>
                    <Image src={item.image} alt={item.name} width={150} height={150} style={{ borderRadius: '8px' }} />
                  </Box>
                  <Typography variant="body1" gutterBottom>{item.description}</Typography>
                  <Typography variant="body2" color="textSecondary">Prix : {item.price}€</Typography>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem' }}>
                    <TextField
                      type="number"
                      value={quantities[item.materialId] || item.quantity}
                      onChange={(e) => handleQuantityChange(item.materialId, Number(e.target.value))}
                      inputProps={{ min: 1 }}
                      sx={{ width: '100px', marginBottom: '1rem' }}
                    />
                    
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleUpdateQuantity(item.materialId)}
                    >
                      Changer la quantité
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleRemoveCartItem(item.materialId)}
                      sx={{ marginTop: '1rem' }}
                    >
                      Supprimer
                    </Button>                    
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h5" sx={{ marginTop: '2rem' }}>
            Prix total : {totalPrice}€
          </Typography>
        </>
      )}

      <Box sx={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleProceedToCheckout}
          disabled={!startDate || !endDate}
        >
          Poursuivre la commande
        </Button>
      </Box>
    </Box>
  );
};

export default CartPage;