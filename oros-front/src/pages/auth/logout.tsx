import { LOGOUT } from "@/requests/queries/auth.queries";
import { useLazyQuery } from "@apollo/client";
import React from "react";
import { useRouter } from "next/router";

const Logout: React.FC = () => {
  const router = useRouter();

  const [logoutUser, { data, loading, error }] = useLazyQuery(LOGOUT, {
    onCompleted: (data) => {
      console.log("Logout completed:", data);
      if (data.logout.success) {
        router.push("/auth/login");
      }
    },
    onError: (error) => {
      console.error("Logout error:", error);
    },
  });

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout} disabled={loading}>
        {loading ? 'Logging out...' : 'Logout'}
      </button>
      {error && <p>Error: {error.message}</p>}
      {data && data.logout.message && <p>{data.logout.message}</p>}
    </div>
  );
};

export default Logout;
