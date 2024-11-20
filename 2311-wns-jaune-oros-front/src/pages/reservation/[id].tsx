import { useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, Card, CardMedia, CardContent } from '@mui/material';
import { FIND_RESERVATION_BY_ID } from '@/requests/queries/reservedMaterial.queries';
import { UPDATE_RESERVED_MATERIAL } from '@/requests/mutations/reservedMaterial.queries';

const ReservationPage = () => {
  const router = useRouter();
  const { id } = router.query;

  
  const { data: reservationData, loading: loadingReservation, error: errorReservation } = useQuery(FIND_RESERVATION_BY_ID, {
    variables: { findReservedMaterialByIdId: id },
    skip: !id,
  });


  const [updateReservedMaterial, { loading: loadingUpdate, error: errorUpdate }] = useMutation(UPDATE_RESERVED_MATERIAL, {
    onCompleted: async () => {
      console.log('Réservation mise à jour avec succès');
      router.push('/profil'); 
    },
    onError: (error) => {
      console.error('Erreur lors de la mise à jour:', error);
    },
  });

  
  const [reservationDetails, setReservationDetails] = useState<any>(null);

  useEffect(() => {
    if (!loadingReservation && reservationData) {
      setReservationDetails(reservationData.findReservedMaterialById);
    }
  }, [loadingReservation, reservationData]);

  if (loadingReservation) return <Typography>Chargement des détails de la réservation...</Typography>;
  if (errorReservation) return <Typography>Erreur: {errorReservation.message}</Typography>;

  
  const handleSubmit = async () => {
    try {
      await updateReservedMaterial({
        variables: {
          infos:{
           id: reservationDetails.id,
          qtty_reserved: parseInt(reservationDetails.qtty_reserved),
          price: reservationDetails.price, 
          material: {
            id: reservationDetails.material.id, 
          },
        },
          }
   
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Modifier la réservation
      </Typography>

      {reservationDetails && (
        <Card sx={{ marginBottom: '20px' }}>
          <CardMedia
            component="img"
            height="140"
            image={reservationDetails.material.image || 'https://cdn3.iconfinder.com/data/icons/file-and-folder-outline-icons-set/144/Image_Error-1024.png'}
            alt={reservationDetails.material.name}
          />
          <CardContent>
            <Typography variant="h6">{reservationDetails.material.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {reservationDetails.material.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Prix: {reservationDetails.price} €
            </Typography>

            <TextField
              label="Quantité réservée"
              name="qtty_reserved"
              type="number"
              value={reservationDetails.qtty_reserved}
              onChange={(e) =>
                setReservationDetails((prevDetails: any) => ({
                  ...prevDetails,
                  qtty_reserved: e.target.value,
                }))
              }
              fullWidth
              margin="normal"
            />

            <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ marginTop: '20px' }}>
              Enregistrer les modifications
            </Button>

            {loadingUpdate && <Typography>En cours de mise à jour...</Typography>}
            {errorUpdate && <Typography color="error">Erreur: {errorUpdate.message}</Typography>}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ReservationPage;