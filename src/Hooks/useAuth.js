import { useEffect, useState } from 'react';
import { auth, gAuthProvider } from '../firebase';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(null);

  function login() {
    auth.signInWithPopup(gAuthProvider);
  }

  function logout() {
    auth
      .signOut()
      .then(() => {
        setAuthenticated(null);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    auth.onAuthStateChanged(
      user => {
        if (user) {
          setAuthenticated(user);
        }
      },
      err => {
        console.log(err);
      }
    );
  }, []);

  return { login, logout, loggedIn: authenticated };
}
