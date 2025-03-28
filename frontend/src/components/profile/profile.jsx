import React, { useState, useEffect } from "react";
import { auth, storage } from "../../services/firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./profile.css";

const ProfilePopup = ({ onClose, updateUserProfile }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setPhotoURL(currentUser?.photoURL || "");
      updateUserProfile(currentUser);
    });
    return () => unsubscribe();
  }, [updateUserProfile]);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      let userCredential;
      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: email.split("@")[0] });
        if (profilePic) await uploadProfilePicture(userCredential.user);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      setUser(userCredential.user);
      updateUserProfile(userCredential.user);
    } catch (error) {
      console.error("Auth Error:", error);
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      updateUserProfile(result.user);
    } catch (error) {
      console.error("Google Login Error:", error);
      alert(error.message);
    }
  };

  const uploadProfilePicture = async (user) => {
    const storageRef = ref(storage, `profilePictures/${user.uid}`);
    await uploadBytes(storageRef, profilePic);
    const downloadURL = await getDownloadURL(storageRef);
    await updateProfile(user, { photoURL: downloadURL });
    setPhotoURL(downloadURL);
    updateUserProfile({ ...user, photoURL: downloadURL });
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setPhotoURL("");
    updateUserProfile(null);
  };

  return (
    <div className="auth-container">
    <div className="auth-card">
      <div className="card-content">
        {user ? (
          <>
            {user.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="profile-image" />
            ) : (
              <div className="profile-initial">
                {user?.displayName?.[0]}
              </div>
            )}
            <h3 className="profile-name">{user.displayName || user.email}</h3>
            <button 
              onClick={handleLogout} 
              className="button button-primary"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <form onSubmit={handleAuth} className="auth-form">
              <h3 className="form-title">
                {isSignUp ? "Sign Up" : "Login"}
              </h3>
              <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="form-input"
                required 
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="form-input"
                required 
              />
              {isSignUp && (
                <div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => setProfilePic(e.target.files?.[0] || null)}
                    className="file-input"
                  />
                </div>
              )}
              <button 
                type="submit" 
                className="button button-primary"
              >
                {isSignUp ? "Sign Up" : "Login"}
              </button>
            </form>
            <p 
              onClick={() => setIsSignUp(!isSignUp)} 
              className="toggle-auth"
            >
              {isSignUp ? "Already have an account? Login" : "Create an account"}
            </p>
            <button 
              onClick={handleGoogleLogin} 
              className="button button-google"
            >
              Login with Google
            </button>
          </>
        )}
        <button 
          onClick={onClose} 
          className="close-button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
  );
};

export default ProfilePopup;
