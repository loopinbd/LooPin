import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "./firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

// Props: children = the component/page to render if authenticated
export default function PrivateRoute({ children, adminOnly = false }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p>Loading...</p>;

  // If user not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Admin only route check
  if (adminOnly && user.email !== "loopinbd@gmail.com") {
    return <Navigate to="/login" />;
  }

  return children;
}
