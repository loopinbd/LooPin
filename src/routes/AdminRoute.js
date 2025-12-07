import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

// Props: children = the admin component/page to render
export default function AdminRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p>Loading...</p>;

  // Not logged in
  if (!user) {
    return <Navigate to="/admin/login" />;
  }

  // Not admin
  if (user.email !== "loopinbd@gmail.com") {
    return <Navigate to="/admin/login" />;
  }

  return children;
      }
