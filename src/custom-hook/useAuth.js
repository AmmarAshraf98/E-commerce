import { useEffect, useState } from "react";
import { auth } from "../firebase.config";
import { onAuthStateChanged } from "firebase/auth";
function useAuth() {
  const [currentUser, setCurrentuser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentuser(user);
      } else {
        setCurrentuser(null);
      }
    });
  }, [currentUser]);
  return currentUser;
}
export default useAuth;
