import { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useMutation } from "@apollo/client";
import { CREATE_MATERIAL } from "@/requests/mutations/materials.mutations";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import adminProtection from "@/hoc/adminProtection";

const NewProduct = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    initial_stock: "",
    slug: "",
    category: "",
    image: "",
  });

  const [createMaterial, { loading, error }] = useMutation(CREATE_MATERIAL, {
    onCompleted: () => {
      router.push("/admin/stocks");
    },
    onError: (err) => {
      console.error("Erreur lors de la création du produit", err);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMaterial({
      variables: {
        infos: {
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          initial_stock: parseInt(formData.initial_stock),
          slug: formData.slug,
          category: { id: parseInt(formData.category) },
          image: formData.image,
        },
      },
    });
  };

  return (
    <div>
      <Typography variant="h4" className={styles.formTitle}>
        Ajouter un produit
      </Typography>
      <form onSubmit={handleSubmit} className={styles.form}>
        <TextField
          label="Nom"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          label="Prix"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Stock initial"
          name="initial_stock"
          type="number"
          value={formData.initial_stock}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Slug"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="ID de la catégorie"
          name="category"
          value={formData.category}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="URL de l'image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Ajouter
        </Button>
      </form>
      {loading && <p>Chargement...</p>}
      {error && <p>Erreur : {error.message}</p>}
    </div>
  );
};

export default adminProtection(NewProduct);
