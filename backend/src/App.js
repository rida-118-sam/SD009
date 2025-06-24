// src/App.js
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import Home from "./Home";
import { AuthProvider, useAuth } from "./auth/AuthProvider";

function AppRoutes() {
  const { currentUser } = useAuth();

  return currentUser ? <Home /> : (
    <>
      <Signup />
      <Login />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
