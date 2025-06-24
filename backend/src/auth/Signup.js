import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Create user doc in Firestore
      await setDoc(doc(db, "users", uid), {
        email: email,
        preferences: []  // Initially blank
      });

      alert("Signup successful!");
    } catch (err) {
      console.error(err);
      alert("Signup failed.");
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
      <button type="submit">Sign Up</button>
    </form>
  );
}
