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
        // Success
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    auth.onAuthStateChanged(
      user => {
        if (user) {
          setAuthenticated(user);
        } else {
          setAuthenticated();
        }
      },
      err => {
        console.log(err);
      }
    );
  }, []);

  return { login, logout, loggedIn: authenticated };
}
