import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import { LIST_MATERIAL_BY_ID } from "@/requests/queries/materials.queries";
import { UPDATE_MATERIAL } from "@/requests/mutations/materials.mutations";
import { Typography, TextField, Button } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import styles from "./index.module.css";
import adminProtection from "@/hoc/adminProtection";

interface Material {
  id: string;
  name: string;
  description: string;
  image: string;
  initial_stock: number;
  price: number;
  slug: string;
  category: {
    id: string;
  };
}

const MaterialDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const { error, loading, data } = useQuery(LIST_MATERIAL_BY_ID, {
    variables: { id },
    skip: !id,
  });

  const [
    updateMaterial,
    { data: updateData, loading: loadingData, error: errorData },
  ] = useMutation(UPDATE_MATERIAL, {
    onCompleted: (updateData) => {
      console.log("Mutation completed:", updateData);
      router.push("/admin/stocks");
    },
    onError: (errorData) => {
      console.error("Mutation error:", errorData);
    },
  });

  const [materialData, setMaterialData] = useState<Material | null>(null);

  if (!loading && !error && data && !materialData) {
    setMaterialData(data.findMaterialById);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMaterialData((prev) => prev && { ...prev, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await updateMaterial({
        variables: {
          infos: {
            id: materialData?.id,
            name: materialData?.name,
            description: materialData?.description,
            price: parseFloat(materialData?.price as unknown as string),
            initial_stock: parseInt(
              materialData?.initial_stock as unknown as string,
              10
            ),
          category: {
            id: parseInt(materialData?.category?.id as unknown as string, 10),
          },
        },
        },
      });
    } catch (error) {
      console.error("Error updating material:", error);
    }
  };

  return (
    <div className={styles.detailsContainer}>
      <Typography variant="h2" style={{ marginBottom: "1.5rem" }}>
        Modifier le produit
      </Typography>
      <Image
        src={materialData?.image || ""}
        alt={materialData?.name || ""}
        width={400}
        height={400}
        className={styles.productImage}
      />

      <TextField
        label="Nom"
        name="name"
        value={materialData?.name || ""}
        onChange={handleInputChange}
        fullWidth
        className={styles.inputField}
      />

      <TextField
        label="Description"
        name="description"
        value={materialData?.description || ""}
        onChange={handleInputChange}
        multiline
        rows={4}
        fullWidth
        className={styles.inputField}
      />

      <TextField
        label="Prix (€)"
        name="price"
        value={materialData?.price || ""}
        onChange={handleInputChange}
        type="number"
        fullWidth
        className={styles.inputField}
      />

      <TextField
        label="Stock"
        name="initial_stock"
        value={materialData?.initial_stock || ""}
        onChange={handleInputChange}
        type="number"
        fullWidth
        className={styles.inputField}
      />

      <Button
        variant="contained"
        onClick={handleSubmit}
        className={styles.submitButton}
      >
        Valider
      </Button>
    </div>
  );
};

export default adminProtection(MaterialDetails);
