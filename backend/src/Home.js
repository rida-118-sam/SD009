import { useAuth } from "./auth/AuthProvider";

export default function Home() {
  const { currentUser, logout } = useAuth();

  return (
    <div>
      <h1>Welcome {currentUser?.email}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
