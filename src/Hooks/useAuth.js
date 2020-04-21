import { useEffect, useState } from 'react';
import { auth, gAuthProvider } from '../config/firebase';

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
        localStorage.removeItem('user');
        localStorage.removeItem('history');
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    if (!localUser) {
      auth.onAuthStateChanged(
        user => {
          if (user) {
            setAuthenticated(user);
            localStorage.setItem('user', JSON.stringify(user));
          }
        },
        err => {
          console.log(err);
        }
      );
    } else {
      setAuthenticated(localUser);
    }
  }, []);

  return { login, logout, loggedIn: authenticated };
}
