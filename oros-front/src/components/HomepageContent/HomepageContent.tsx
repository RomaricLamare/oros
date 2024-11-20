"use client";

import { Material, useListMaterialsQuery } from "@/types/graphql";
import * as React from "react";
import Slider from "react-slick"; // Importez le carrousel
import MaterialCard from "@/components/MaterialCard/MaterialCard";
import styles from "./HomepageContent.module.css"; // Import du module CSS

const getRandomMaterials = (
  materials: Material[],
  count: number
): Material[] => {
  const shuffled = materials.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const HomepageContent: React.FC = () => {
  const { loading, error, data } = useListMaterialsQuery({
    fetchPolicy: "no-cache",
  });

  console.log({ loading, error, data });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    return <p>Error: {error.message}</p>;
  }

  const featuredMaterials = getRandomMaterials(data?.listMaterials || [], 5);

  // Paramètres du carrousel avec 4 colonnes
  const settings = {
    dots: true, // Afficher les points en dessous du carrousel
    infinite: true, // Carrousel infini
    speed: 500, // Vitesse de transition
    slidesToShow: 4, // Afficher 4 produits à la fois
    slidesToScroll: 1, // Faire défiler 1 produit à la fois
    responsive: [
      {
        breakpoint: 1024, // En dessous de 1024px, afficher 3 produits
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600, // En dessous de 600px, afficher 2 produits
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // En dessous de 480px, afficher 1 produit
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div>
      <h1 className={styles.title}>À la Une</h1>
      <div className={styles.featuredArticles}>
        <Slider {...settings}>
          {featuredMaterials.map((material: Material) => (
            <div key={material.id} className={styles.carouselItem}>
              <MaterialCard material={material} />
            </div>
          ))}
        </Slider>
      </div>

      <h2 className={styles.title}>Découvrez nos marques partenaires</h2>
      <div className={styles.brandPartners}>
        {[
          "/atomic.png",
          "/black-crows.png",
          "/blizzard.png",
          "/cairn.png",
          "/canada-goose.png",
          "/rossignol.png",
          "/salomon.png",
          "/shred.png",
        ].map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Marque partenaire ${index + 1}`}
            className={styles.brandImage}
          />
        ))}
      </div>
    </div>
  );
};

export default HomepageContent;
