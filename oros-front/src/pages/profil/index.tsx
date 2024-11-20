import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/client';
import { USER_INFOS } from '@/requests/queries/auth.queries';
import { UPDATE_USER } from '@/requests/mutations/auth.mutations';
import { LIST_RESERVATION_BY_ID } from '@/requests/queries/reservedMaterial.queries';
import { DELETE_RESERVED_MATERIAL } from '@/requests/mutations/reservedMaterial.queries';
import {
  Typography,
  TextField,
  Button,
  Avatar,
  Card,
  CardMedia,
  CardContent,
  Box,
  Grid,
} from '@mui/material';
import { useState, useEffect } from 'react';

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}

const Profil = () => {
  const router = useRouter();
  const { error: userError, loading: userLoading, data: userData } = useQuery(USER_INFOS);
  
  const { 
    data: reservationsData, 
    loading: loadingReservations, 
    error: errorReservations,
    refetch
  } = useQuery(LIST_RESERVATION_BY_ID, {
    variables: { userId: userData?.userInfos?.id }, 
    skip: userLoading || !userData,
  });
  
  const [updateUser, { loading: loadingUpdate, error: errorUpdate }] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      console.log("Utilisateur mis à jour avec succès");
    },
    onError: (error) => {
      console.error("Erreur lors de la mise à jour:", error);
    },
  });

  const [deleteReservedMaterial, { loading: loadingDelete, error: errorDelete }] = useMutation(DELETE_RESERVED_MATERIAL, {
    onCompleted: async () => {
      console.log("Réservation supprimée avec succès");
      await refetch();
    },
    onError: (error) => {
      console.error("Erreur lors de la suppression:", error);
    },
  });

  const [userDetails, setUserDetails] = useState<User | null>(null);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (!userLoading && !userError && userData && !userDetails) {
      setUserDetails(userData.userInfos);
    }
  }, [userLoading, userError, userData, userDetails]);

  if (userLoading) return <Typography variant="body1" color="black">Chargement des informations utilisateur...</Typography>;
  if (userError) return <Typography variant="body1" color="black">Erreur: {userError.message}</Typography>;

  if (loadingReservations) return <Typography variant="body1" color="black">Chargement des réservations...</Typography>;
  if (errorReservations) return <Typography variant="body1" color="black">Erreur: {errorReservations.message}</Typography>;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prev) => prev && { ...prev, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await updateUser({
        variables: {
          infos: {
            id: userDetails?.id,
            firstname: userDetails?.firstname,
            lastname: userDetails?.lastname,
            email: userDetails?.email,
          },
        },
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
    }
  };

  const handleModifyReservedMaterial = async (reservationId: string) => {
    router.push(`/reservation/${reservationId}`);
  };

  const handleDeleteReservedMaterial = async (reservationId: string) => {
      try {
        await deleteReservedMaterial({
          variables: {
            deleteReservedMaterialId: reservationId,
          },
        });
      } catch (error) {
        console.error("Erreur lors de la suppression de la réservation:", error);
      }
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Grid container spacing={4}>
        {/* Section Profil */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" color="black" gutterBottom>
            Mon profil
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <Avatar
              alt="Avatar de profil"
              src="/chemin-vers-avatar.jpg"
              sx={{ width: 100, height: 100 }}
            />
          </Box>

          <TextField
            label="Nom"
            name="lastname"
            value={userDetails?.lastname || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Prénom"
            name="firstname"
            value={userDetails?.firstname || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Email"
            name="email"
            value={userDetails?.email || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />

          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSubmit}
            >
              Enregistrer les modifications
            </Button>
          </Box>

          {loadingUpdate && <Typography variant="body1" align="center" color="black" sx={{ marginTop: '20px' }}>En cours de mise à jour...</Typography>}
          {errorUpdate && <Typography variant="body1" align="center" color="error" sx={{ marginTop: '20px' }}>Erreur: {errorUpdate.message}</Typography>}
        </Grid>

        {/* Section Réservations */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" color="black" gutterBottom>
            Mes réservations
          </Typography>

          {reservationsData?.listReservedMaterialsByUserId.length === 0 ? (
            <Typography variant="h6" color="black">Aucune réservation trouvée.</Typography>
          ) : (
            reservationsData.listReservedMaterialsByUserId.map((reservation: any) => (
              <Card key={reservation.id} sx={{ marginBottom: '20px' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={reservation.material.image || "https://cdn3.iconfinder.com/data/icons/file-and-folder-outline-icons-set/144/Image_Error-1024.png"}
                  alt={reservation.material.name}
                />
                <CardContent>
                  <Typography variant="h6" color="black">{`Réservation N°${reservation.id}`}</Typography>
                  <Typography variant="body2" color="black">
                    {`Du ${new Date(reservation.reservation.start_date).toLocaleDateString()} au ${new Date(reservation.reservation.end_date).toLocaleDateString()}, ${reservation.qtty_reserved} articles`}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button 
                      onClick={() => handleModifyReservedMaterial(reservation.id)}
                      variant="contained" 
                      color="primary" 
                      sx={{ marginTop: '20px' }}
                    >
                      Modifier ma réservation
                    </Button>
                    <Button 
                     onClick={() => handleDeleteReservedMaterial(reservation.id)}
                    variant="contained" color="error" sx={{ marginTop: '20px' }}>
                      Supprimer ma réservation
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profil;