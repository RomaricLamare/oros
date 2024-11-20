import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { LIST_ALL_RESERVATIONS } from '@/requests/queries/reservedMaterial.queries';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import adminProtection from '@/hoc/adminProtection';
import { DELETE_RESERVED_MATERIAL } from '@/requests/mutations/reservedMaterial.queries';

const Reservations = () => {
  const { data, loading, error, refetch } = useQuery(LIST_ALL_RESERVATIONS);
  const [deleteReservation] = useMutation(DELETE_RESERVED_MATERIAL, {
    onCompleted: () => {
      console.log("Réservation supprimée avec succès");
      refetch(); // Rafraîchir la liste des réservations après suppression
    },
    onError: (error) => {
      console.error("Erreur lors de la suppression de la réservation :", error);
    }
  });

  if (loading) return <p>Chargement des réservations...</p>;
  if (error) return <p>Erreur lors du chargement des réservations : {error.message}</p>;

  const reservationsByUser = data?.listReservedMaterials.reduce((acc: any, reservation: any) => {
    const userId = reservation.reservation.user.id;
    if (!acc[userId]) {
      acc[userId] = {
        user: reservation.reservation.user,
        reservations: [],
      };
    }
    acc[userId].reservations.push(reservation);
    return acc;
  }, {});

  const handleDeleteReservation = async (reservationId: string) => {
    try {
      await deleteReservation({ variables: { deleteReservedMaterialId: reservationId } });
      alert("Réservation supprimée avec succès");
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  return (
    <Box sx={{ padding: 4, color: "black" }}>
      <Typography style={{ marginBottom: "50px" }} variant="h4" gutterBottom>Liste des réservations</Typography>

      {Object.values(reservationsByUser).map((userGroup: any) => (
        <Box key={userGroup.user.id} sx={{ marginBottom: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {userGroup.user.firstname} {userGroup.user.lastname}
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Matériel</TableCell>
                  <TableCell>Quantité</TableCell>
                  <TableCell>Prix</TableCell>
                  <TableCell>Date de début</TableCell>
                  <TableCell>Date de fin</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userGroup.reservations.map((reservation: any) => (
                  <TableRow key={reservation.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <img src={reservation.material.image} alt={reservation.material.name} width="50" height="50" style={{ marginRight: 8 }} />
                        {reservation.material.name}
                      </Box>
                    </TableCell>
                    <TableCell>{reservation.qtty_reserved}</TableCell>
                    <TableCell>{reservation.price}€</TableCell>
                    <TableCell>{new Date(reservation.reservation.start_date).toLocaleDateString('fr-FR')}</TableCell>
                    <TableCell>{new Date(reservation.reservation.end_date).toLocaleDateString('fr-FR')}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDeleteReservation(reservation.id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ))}
    </Box>
  );
};

export default adminProtection(Reservations);