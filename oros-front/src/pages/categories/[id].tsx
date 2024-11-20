import MaterialCard from "@/components/MaterialCard/MaterialCard";
import { useFindCategoryByIdQuery } from "@/types/graphql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Grid, Pagination } from "@mui/material";

const CategoryPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useFindCategoryByIdQuery({
    variables: { id: id as string },
    skip: !id,
  });

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const materials = data?.findCategoryById?.materials || [];

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMaterials = materials.slice(startIndex, endIndex);

  const totalPages = Math.ceil(materials.length / itemsPerPage);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <h1
        style={{
          color: "black",
          marginTop: "20px",
          marginBottom: "20px",
          paddingLeft: "15px",
        }}
      >
        Nos produits
      </h1>
      <Grid
        container
        spacing={2}
        style={{ paddingLeft: "16px", paddingRight: "16px" }}
      >
        {currentMaterials.map((material) => (
          <Grid item xs={12} sm={6} md={3} key={material.id}>
            <MaterialCard material={material} />
          </Grid>
        ))}
      </Grid>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </div>
  );
};

export default CategoryPage;
