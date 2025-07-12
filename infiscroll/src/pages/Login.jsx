import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAwjquj9GjEnoDrlUYSQNbJd4NzFGvTBZ0",
  authDomain: "mywebd-5b41c.firebaseapp.com",
  projectId: "mywebd-5b41c",
  storageBucket: "mywebd-5b41c.appspot.com",
  messagingSenderId: "509975022481",
  appId: "1:509975022481:web:74170889e45ac6da4de830",
  measurementId: "G-KQRX6DY58M"
};

// Firebase Init
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

function Login({ redirectTo = "/" }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    localStorage.setItem('theme-dark', 'false');
    document.body.classList.add('light-theme');
    document.body.classList.remove('dark-theme');
    document.body.style.background = '#fff';
    document.body.style.color = '#222';
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      localStorage.setItem('user', JSON.stringify(user));
      alert("Google Login Successful!");
      navigate(redirectTo);
    } catch (error) {
      alert('Google Login failed: ' + error.message);
    }
  };

  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful!");
      navigate(redirectTo);
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  const handleEmailSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup successful!");
      navigate(redirectTo);
    } catch (error) {
      alert("Signup failed: " + error.message);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
      background: 'linear-gradient(135deg, #f0f4ff 0%, #ffffff 100%)',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: window.innerWidth < 768 ? 'column' : 'row',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #a259ff 0%, #f24e1e 100%)',
      }}>

        {window.innerWidth >= 768 && (
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
          }}>
            <img
              src="/premium_photo-1720192861939-f469be34d5d7.avif"
              alt="Visual"
              style={{
                width: '90%',
                maxWidth: 440,
                borderRadius: 18,
                boxShadow: '0 4px 20px rgb(255, 255, 255)',
                objectFit: 'cover',
              }}
            />
          </div>
        )}

        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
        }}>
          <div style={{
            width: '100%',
            maxWidth: 420,
            background: 'rgba(255, 255, 255, 0.42)',
            borderRadius: 24,
            backdropFilter: 'blur(12px)',
            padding: '42px 32px',
            boxShadow: '0 8px 32px rgba(161, 89, 255, 0.84), 0 2px 12px rgb(0, 0, 0)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
          }}>

            <h2 style={{ fontWeight: 700, fontSize: 24, color: '#181c32' }}>Welcome to infiScroll</h2>
            <p style={{ fontSize: 16, color: 'black', textAlign: 'center' }}>
              Discover endless content tailored just for you.
            </p>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                background: '#EDE9FE',
                color: 'black',
                border: '1.5px solid rgb(176, 202, 255)',
                borderRadius: 10,
                padding: '0 18px',
                height: 48,
                fontSize: 16,
                fontWeight: 550,
                width: '100%',
              }}
            />

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              maxLength={8}
              style={{
                background: '#EDE9FE',
                color: 'black',
                border: '1.5px solid rgb(176, 202, 255)',
                borderRadius: 10,
                padding: '0 18px',
                height: 48,
                fontSize: 16,
                fontWeight: 550,
                width: '100%',
              }}
            />

            <button onClick={handleEmailLogin} style={{
              background: 'linear-gradient(135deg, rgba(162,89,255,0.13), rgba(242,78,30,0.13))',
              color: 'black',
              border: '1.5px solid rgb(176, 202, 255)',
              borderRadius: 10,
              height: 48,
              fontSize: 16,
              fontWeight: 550,
              width: '100%',
              cursor: 'pointer',
            }}>Sign In</button>

            <button onClick={handleEmailSignup} style={{
              background: 'linear-gradient(135deg, rgba(242,78,30,0.13), rgba(162,89,255,0.13))',
              color: 'black',
              border: '1.5px solid rgb(176, 202, 255)',
              borderRadius: 10,
              height: 48,
              fontSize: 16,
              fontWeight: 550,
              width: '100%',
              cursor: 'pointer',
            }}>Log in</button> 

            <button onClick={handleGoogleLogin} style={{
              background: 'linear-gradient(135deg, rgba(162,89,255,0.13), rgba(242,78,30,0.13))',
              color: 'black',
              border: '1.5px solid rgb(176, 202, 255)',
              borderRadius: 10,
              height: 48,
              fontSize: 16,
              fontWeight: 550,
              width: '100%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
            }}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/800px-Google_Favicon_2025.svg.png"
                alt="Google"
                style={{ width: 22, height: 22, borderRadius: 2 }}
              />
              Continue with Google
            </button>

            <p style={{ fontSize: 13.5, color: 'black', textAlign: 'center' }}>
              By continuing, you agree to our <a href="#" style={{ color: '#7b3ff2', textDecoration: 'underline' }}>Terms of Service</a> and <a href="#" style={{ color: '#7b3ff2', textDecoration: 'underline' }}>Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
