import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { ComponentType } from 'react';
import { AuthContext } from "@/context/authProvider";


const adminProtection = (WrappedComponent: ComponentType) => {
  const ProtectedComponent = (props: any) => {
    const router = useRouter();
      const { userInfos, refreshUserInfos } = useContext(AuthContext);

  useEffect(() => {
    refreshUserInfos();
  }, [refreshUserInfos]);

    useEffect(() => {
      if ((userInfos && userInfos?.role !== 'ADMIN') || userInfos === null){
        router.push('/auth/login'); // Redirige vers la page de login si l'utilisateur n'est pas admin
      }
    },[userInfos, router])

    if (!userInfos) {
      return <p>Loading...</p>; // Affiche un message de chargement pendant la vérification
    } else {
      return <WrappedComponent {...props} />;
    }
  };

  ProtectedComponent.displayName = `AdminProtected(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ProtectedComponent;
};

export default adminProtection;