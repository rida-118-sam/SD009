import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth, createUserWithEmailAndPasswordsignInWithEmailAndPassword} from "firebase/auth";
import { auth, db } from "../firebase";
import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function Login() {
  const [username, setUsername] = useState(""); // Use username now
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Find the email from Firestore using username
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", username));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        alert("Username not found.");
        return;
      }

      const email = snapshot.docs[0].data().email;

      // Step 2: Login using email and password
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
    } catch (err) {
      console.error(err);
      alert("Login failed.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <button type="submit">Log In</button>
    </form>
  );
}
const auth = getAuth();
