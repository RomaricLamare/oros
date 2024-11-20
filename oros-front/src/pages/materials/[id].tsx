import { useRouter } from "next/router";
import { useFindMaterialByIdQuery, useUserInfosQuery } from "@/types/graphql";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { UPDATE_CART } from "@/requests/mutations/session.mutation";
import { useMutation } from "@apollo/client";

const MaterialPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [quantity, setQuantity] = useState(1);

  const {
    loading: loadingMaterial,
    error: errorMaterial,
    data: materialData,
  } = useFindMaterialByIdQuery({
    variables: { id: id as string },
  });

  const {
    loading: loadingUser,
    error: errorUser,
    data: userData,
    refetch: refetchUserData,
  } = useUserInfosQuery();

  const [updateCart, { loading: loadingUpdate, error: errorUpdate }] =
    useMutation(UPDATE_CART, {
      onCompleted: async (updateData) => {
        console.log("Mise à jour du panier réussie:", updateData);
        alert(
          `${quantity} de ${materialData?.findMaterialById.name} a été ajouté au panier!`
        );
        await refetchUserData();
      },
      onError: (errorData) => {
        console.error("Erreur lors de la mise à jour du panier:", errorData);
        alert("Une erreur s'est produite lors de l'ajout au panier.");
      },
    });

  const handleAddToCart = async () => {
    if (!materialData) return;

    const materialId = materialData.findMaterialById.id;

    if (loadingUser) {
      alert("Chargement des informations utilisateur. Veuillez patienter.");
      return;
    }

    if (!userData || !userData.userInfos) {
      alert("Vous devez être connecté pour ajouter au panier.");
      router.push('/auth/login');
      return;
    }

    const sessionId = userData.userInfos.session?.id;

    try {
      await updateCart({
        variables: {
          sessionId,
          materialId,
          quantity,
          endDate: new Date(),
          startDate: new Date(),
        },
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
      alert("Une erreur s'est produite lors de l'ajout au panier.");
    }
  };

  if (loadingMaterial || loadingUser) return <p>Loading...</p>;
  if (errorMaterial) return <p>Erreur: {errorMaterial.message}</p>;
  if (errorUser) return <p>Erreur: {errorUser.message}</p>;

  return (
 <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "2rem",
      }}
    >
      <Typography
        variant="h4"
        style={{
          color: "black",
          fontWeight: "bold",
          marginBottom: "1rem",
          textAlign: "left",
          width: "100%",
          maxWidth: "800px",
        }}
      >
        {materialData?.findMaterialById.name}
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "2rem",
          width: "100%",
          maxWidth: "800px",
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Image
            src={materialData?.findMaterialById.image as string}
            alt={materialData?.findMaterialById.name as string}
            width={300}
            height={300}
            priority
            style={{ objectFit: "contain" }}
          />
        </Box>

        <Box sx={{ flex: 2, marginLeft: "2rem" }}>
          <Typography
            variant="h5"
            style={{ color: "black", marginTop: "1rem" }}
          >
            {materialData?.findMaterialById.price}€/jour
          </Typography>

          <Box sx={{ marginTop: "2rem" }}>
            <Typography variant="body1" style={{ color: "black" }}>
              Quantité
            </Typography>
            <Select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              sx={{ width: "100px", marginBottom: "1rem" }}
            >
              {Array.from({ length: 10 }, (_, index) => (
                <MenuItem key={index + 1} value={index + 1}>
                  {index + 1}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#55B6C7",
              color: "white",
              marginTop: "1rem",
              width: "100%",
            }}
            onClick={handleAddToCart}
          >
            Ajouter au panier
          </Button>

          <Box
            sx={{
              border: "1px solid #ddd",
              borderRadius: "4px",
              padding: "1rem",
              marginTop: "1rem",
              marginBottom: "4rem",
            }}
          >
            <Typography
              variant="h6"
              style={{ color: "black", fontWeight: "bold" }}
            >
              Description
            </Typography>
            <Typography
              variant="body1"
              style={{ color: "black", marginTop: "0.5rem" }}
            >
              {materialData?.findMaterialById.description}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MaterialPage;