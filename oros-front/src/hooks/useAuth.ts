import { useContext } from "react";
import { AuthContext } from "@/context/authProvider"; 
function useAuth() {
  const context = useContext(AuthContext);

//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }

  return context;
}

export default useAuth;