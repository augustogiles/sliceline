import { useEffect, useState } from 'react';

const auth = window.firebase.auth();
const provider = new window.firebase.auth.GoogleAuthProvider();

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(null);

  function login() {
    auth.signInWithPopup(provider);
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
          console.log(user);
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
