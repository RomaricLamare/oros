import React from "react";
import styles from "./Footer.module.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          <h4>À Propos</h4>
          <ul>
            <li>Qui sommes-nous ?</li>
            <li>Notre histoire</li>
            <li>Contactez-nous</li>
          </ul>
        </div>
        <div className={styles.section}>
          <h4>Services</h4>
          <ul>
            <li>Louez du matériel</li>
            <li>Réservations</li>
            <li>Assistance</li>
          </ul>
        </div>
        <div className={styles.section}>
          <h4>Suivez-nous</h4>
          <ul className={styles.socialMedia}>
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon />
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; 2024 Oros. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
