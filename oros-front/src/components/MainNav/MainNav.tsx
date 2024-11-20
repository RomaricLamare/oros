import {
  Autocomplete,
  Box,
  Button,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useContext, useEffect, useState } from "react";
import Register from "@/pages/auth/register";
import styles from "./MainNav.module.css";
import {
  useListMaterialsQuery,
  useLogoutQuery,
  Category,
  Material,
  useListCategoriesQuery,
} from "@/types/graphql";
import { useRouter } from "next/router";
import Login from "@/pages/auth/login";
import useAuth from "@/hooks/useAuth";
import { LOGOUT } from "@/requests/queries/auth.queries";
import { useLazyQuery } from "@apollo/client";
import Link from "next/link";
import CategoryButton from "../CategoryButton";
import { client } from "@/pages/_app";
import LoginCommon from "../LoginCommon";
import { AuthContext } from "@/context/authProvider";

const MainNav = () => {
  const { userInfos, refreshUserInfos, loading } = useContext(AuthContext);
  
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false); 
  const [isHomePage, setIsHomePage] = useState<boolean>(true); 
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isAdminRoute = router.pathname.startsWith("/admin");

const isAdmin = !loading && userInfos?.role === "ADMIN";
const [executeLogout] = useLazyQuery(LOGOUT);

    useEffect(() => {
    refreshUserInfos();
  }, [refreshUserInfos]);

  console.log(isAdmin);

  // Hook pour définir si on est sur la page d'accueil et mettre à jour le state
  useEffect(() => {
    setIsHomePage(router.pathname === "/");
  }, [router]);

  const {
    loading: loadingMaterial,
    error: errorMaterial,
    data: dataMaterial,
  } = useListMaterialsQuery({
    fetchPolicy: "no-cache",
  });

  const {
    loading: loadingCategories,
    error: errorCategories,
    data: dataCategories,
  } = useListCategoriesQuery({
    fetchPolicy: "no-cache",
  });

  if (loadingMaterial || loadingCategories) return <p>Loading...</p>;
  if (errorMaterial || errorCategories) return <p>Error loading data.</p>;

  //variable pour itérer sur les matériels et les afficher dans l'autocomplete
  const materials =
    dataMaterial?.listMaterials?.map((material) => ({
      label: material.name,
      id: material.id,
    })) || [];

    // Fonction pour rediriger vers la page du matériel sélectionné
  const handleOptionSelect = (event: any, value: any) => {
    if (value) {
      router.push(`/materials/${value.id}`);
    }
  };

  const openLoginModal = () => {
    setShowRegisterModal(false);
    setIsModalOpen(true);
  };

  const openRegisterModal = () => {
    setIsModalOpen(true);
    setShowRegisterModal(true);
  };

  const closeAllModals = () => {
    setIsModalOpen(false);
    setShowRegisterModal(false);
  };
  const onCompletedModal = async (data: any) => {
    console.log("JE SUIS DANS LE ON COMPLETED MODAL")
      if (data.login.success) {
        closeAllModals();
        await client.refetchQueries({include:["UserInfos"]});
        router.push('/');
      }
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

const handleLogout = async () => {
  try {
    const { data } = await executeLogout();
    if (data?.logout.success) {
      // Utilisez window.location.href pour forcer un rechargement complet de la page
      window.location.href = "/";
    } else {
      console.error("Logout failed:", data?.logout.message);
    }
  } catch (err) {
    console.error("Error logging out:", err);
  }
  handleClose();
};

  const handleProfil = () => {
    setAnchorEl(null);
    router.push("/profil");
  };

 return (
    <nav
      /* On défini les classes CSS en fonction de la page et du rôle de l'utilisateur */
      className={`${styles.nav} ${isHomePage && !isAdminRoute ? styles.homePageNav : ""} ${isAdminRoute ? styles.adminNav : ""}`}
    >
      {/* On affiche l'image de fond uniquement sur la page d'accueil */}
      {isHomePage && !isAdminRoute && <div className={styles.backgroundImage}></div>}

      {/* Image du logo */}
      <div className={styles.topRow}>
        <Image
          className={styles.logo}
          src="/Logo_blanc.png"
          alt="Logo"
          width={180}
          height={180}
          priority
          onClick={() => router.push("/")}
        />

        {!isAdminRoute && (
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={materials}
            onChange={handleOptionSelect}
            sx={{ width: 300 }}
            className={styles.input}
            renderInput={(params) => (
              <TextField {...params} label="Rechercher un matériel" />
            )}
          />
        )}

        <div className={styles.icons}>
          {isAdmin && !isAdminRoute && (
            <Button
              onClick={() => router.push("/admin/stocks")}
              className={styles.adminButton}
              data-testid="admin-link"
            >
              Espace Admin
            </Button>
          )}
          {!isAdminRoute && (
            <Button onClick={() => router.push("/cart")}>
              <ShoppingCartIcon className={styles.icons}/>
            </Button>
          )}
          {userInfos && userInfos?.id ? (
            <>
              <Button onClick={handleMenu}>
                <AccountCircleIcon className={styles.icons} />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfil}>Profil</MenuItem>
                <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
              </Menu>
            </>
          ) : (
            <Button onClick={openLoginModal} style={{ color:"#eeeeee" }}>
              <AccountCircleIcon />
            </Button>
          )}
        </div>
      </div>

      {isHomePage && !isAdminRoute && (
        <>
          <div>
            <Typography className={styles.title}>
              Louez le matériel adapté à votre sport de montagne !
            </Typography>
          </div>
          <div className={styles.categoryButtonsRow}>
            <ul>
              {dataCategories?.listCategories?.map((category: Category) => (
                <li key={category.id} className={styles.categoryButtonList}>
                  <CategoryButton name={category.name} id={category.id} />
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {isAdminRoute && (
        <div className={styles.adminButtonsRow}>
          <Button
            onClick={() => router.push("/admin/stocks")}
            className={styles.buttonStocks}
          >
            Stocks
          </Button>
          <Button
            onClick={() => router.push("/admin/reservations")}
            className={styles.buttonReservations}
            style={{ backgroundColor: "#D9D9D9" }}
          >
            Réservations
          </Button>
          <Link href="/" passHref className={styles.adminToClientLink}>
            Retour espace client
          </Link>
        </div>
      )}

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={styles.modal}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid black",
        }}
      >
        {showRegisterModal ? (
          <Box>
            <Register />
          </Box>
        ) : (
          <Box>
            <LoginCommon
              showRegister={openRegisterModal}
              onCompleted={onCompletedModal}
            />
          </Box>
        )}
      </Modal>
    </nav>
  );
};

export default MainNav;
