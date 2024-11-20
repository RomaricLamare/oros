import React, { useState } from "react";
import { Autocomplete, Button, colors, IconButton, Pagination, TextField, Typography } from "@mui/material";
import styles from "./index.module.css";
import { LIST_MATERIALS } from "@/requests/queries/materials.queries";
import { useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/router";
import adminProtection from "@/hoc/adminProtection";
import { DELETE_MATERIAL } from "@/requests/mutations/materials.mutations";
import { Delete } from "@mui/icons-material";

interface Material {
  name: string;
  description: string;
  image: string;
  initial_stock: number;
  price: number;
  slug: string;
  category: number;
  id: string;
}

const Stocks = () => {
  const router = useRouter();
  const { error, loading, data, refetch } = useQuery(LIST_MATERIALS, {
    fetchPolicy: "no-cache",
  });

  const [deleteMaterial] = useMutation(DELETE_MATERIAL);
  const [sortByCategory, setSortByCategory] = useState<boolean>(false);
  const [sortByPrice, setSortByPrice] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const materials = data?.listMaterials || [];

  const sortMaterials = (materials: Material[]) => {
    let sortedMaterials = [...materials];

    if (sortByCategory) {
      sortedMaterials.sort((a, b) => a.category - b.category);
    }
    if (sortByPrice) {
      sortedMaterials.sort((a, b) => a.price - b.price);
    }

    return sortedMaterials;
  };

  const handleSortClick = (sortType: string) => {
    if (sortType === "category") {
      setSortByCategory((prev) => !prev);
    }
    if (sortType === "price") {
      setSortByPrice((prev) => !prev);
    }
  };

  const handleProductClick = (id: string) => {
    router.push(`/admin/stocks/${id}`);
  };

    const handleDelete = async (id: string) => {
    try {
      await deleteMaterial({ variables: { deleteMaterialId: id } });
      alert("Produit supprimé avec succès");
      refetch(); // Recharger les données après suppression
    } catch (error) {
      console.error("Erreur lors de la suppression du produit :", error);
      alert("Une erreur s'est produite lors de la suppression du produit.");
    }
  };

  const sortedMaterials = sortMaterials(materials);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMaterials = sortedMaterials.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleAddProductClick = () => {
    router.push("/admin/stocks/newProduct");
  };

  // Variable pour itérer sur les matériels et les afficher dans l'autocomplete
  const searchMaterials =
    materials?.map((material: Material) => ({
      label: material.name,
      id: material.id,
    })) || [];

  // Fonction pour rediriger vers la page du matériel sélectionné
  const handleOptionSelect = (event: any, value: any) => {
    if (value) {
      router.push(`/admin/stocks/${value.id}`);
    }
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.secondDiv}>
        <Typography className={styles.title} variant="h4">
          Tous les produits
        </Typography>
        <Typography className={styles.title} variant="h5">
          Trier par
        </Typography>
        <div className={styles.filterButtons}>
          <Button
            variant={sortByPrice ? "contained" : "outlined"}
            onClick={() => handleSortClick("price")}
            className={styles.filterButton}
          >
            Prix
          </Button>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={searchMaterials}
            onChange={handleOptionSelect}
            sx={{ width: 300 }}
            className={styles.input}
            renderInput={(params) => (
              <TextField {...params} label="Rechercher un matériel" />
            )}
          />
        </div>
      </div>

      <div className={styles.products}>
        <div className={styles.productsInfos}>
          {currentMaterials.map((material: Material) => (
            <div
              key={material.id}
              className={styles.productCard}
              onClick={() => handleProductClick(material.id)}
              style={{ cursor: "pointer" }}
            >
              <Image
                src={material.image}
                alt={material.name}
                width={100}
                height={100}
                className={styles.productImage}
              />
              <div className={styles.productDetails}>
                <Typography className={`${styles.infoMaterials} ${styles.productName}`} variant="h6">
                  {material.name}
                </Typography>
                <Typography className={styles.infoMaterials} variant="body2">
                  Stocks: {material.initial_stock}
                </Typography>
                <Typography className={`${styles.infoMaterials}`} variant="body2">
                 Prix: {material.price} €
                </Typography>
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => handleProductClick(material.id)}
                  style={{
                    textTransform: "none",
                    marginTop: "0.5rem",
                    alignSelf: "center",
                  }}
                  className={styles.modifyButton}
                >
                  Modifier produit
                </Button>
                <IconButton
                  aria-label="delete"
                  onClick={(e) => { 
                    e.stopPropagation();
                    handleDelete(material.id)
                  }}
                  className={styles.modifyButton}
                >
                  <Delete color="error" />
                </IconButton>
              </div>
            </div>
          ))}
          <Pagination
            className={styles.pagination}
            count={Math.ceil(sortedMaterials.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
        <div
          className={styles.addProduct}
          onClick={handleAddProductClick}
          style={{ cursor: "pointer" }}
        >
          Ajouter un produit
        </div>
      </div>
    </div>
  );
};

export default adminProtection(Stocks);