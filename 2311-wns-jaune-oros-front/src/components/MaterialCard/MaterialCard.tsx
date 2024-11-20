import { FindCategoryByIdQuery } from "@/types/graphql";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import styles from "./MaterialCard.module.css"; // Import du module CSS

type ListMaterialType = Extract<
  FindCategoryByIdQuery["findCategoryById"]["materials"],
  Array<{ __typename?: "Material" }>
>[number];

function MaterialCard({ material }: { material: ListMaterialType }) {
  const router = useRouter();

  return (
    <div className={styles.card}>
      <Image
        src={material.image}
        alt={material.name}
        onClick={() => router.push(`/materials/${material.id}`)}
        layout="responsive" // Utilisez le mode responsive
        width={350} // Largeur augmentée
        height={200} // Hauteur ajustée
        className={styles.image}
      />
      <div className={styles.info}>
        <div className={styles.left}>
          <h3 className={styles.name}>{material.name}</h3>
        </div>
        <div className={styles.right}>
          <span className={styles.price}>{material.price.toFixed(2)}€</span>
          <button onClick={() => router.push(`/materials/${material.id}`)} className={styles.addButton}>Réserver</button>
        </div>
      </div>
    </div>
  );
}

export default MaterialCard;
