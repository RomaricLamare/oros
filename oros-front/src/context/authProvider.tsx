import { useUserInfosQuery, UserInfosQuery } from "@/types/graphql";
import { createContext, useCallback } from "react";

interface AuthContextType {
  userInfos?: UserInfosQuery["userInfos"];
  loading: boolean; // Ajoutez le statut de chargement
  refreshUserInfos: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  userInfos: undefined,
  loading: true, // Initialement en mode chargement
  refreshUserInfos: async () => {},
});

function AuthProvider({ children }: React.PropsWithChildren) {
  const { data, refetch, loading } = useUserInfosQuery({ fetchPolicy: "no-cache" });

  const refreshUserInfos = useCallback(async () => {
    try {
      await refetch();
    } catch (error) {
      console.error("Erreur lors du rafraîchissement des informations utilisateur:", error);
    }
  }, [refetch]);

  return (
    <AuthContext.Provider value={{ userInfos: data?.userInfos, loading, refreshUserInfos }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;