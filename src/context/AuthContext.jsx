import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { FirebaseApp } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const authContext = createContext();


export const useAuthContext = () => {
    return useContext(authContext);
};



const auth = getAuth(FirebaseApp);
const db = getFirestore(FirebaseApp);

const formData = collection(db, "user");



const addUser = async (email, name, userId) => {
    const data = await addDoc(formData, {
        email: email,
        name: name,
        userId: userId,
    });

    console.log("User added to Firestore:", data);
};






export const AuthContext = ({ children }) => {
  
    const [isRegistered, setIsRegistered] = useState(false);
    const [user, setUser] = useState(null)
    const [authError, setAuthError] = useState(null)
    const navigate = useNavigate();




    const HandleSignup = async (email, password, name, setIsRegistered) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            // Set the user's display name
            await updateProfile(userCredential.user, {
                displayName: name,
            });

            const newUser = userCredential.user;
            setIsRegistered(true);
            addUser(newUser.email, name, newUser.uid);
            navigate("/"); // Use navigate to go to the homepage
        } catch (error) {
            setAuthError(error);
            console.error("Error signing up:", error.message);
        }
    };




    const SignIn = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            if (userCredential) {
                navigate("/");
            }
        } catch (error) {
            setAuthError(error);
            console.error("Error signing in:", error.message);
        }
    };
    const Logout = () => {
        signOut(auth)
            .then(() => {
                setUser(null);
                navigate("/login"); // Use navigate to go to the login page
                console.log('successful log out');
            })
            .catch((error) => {
                console.error("Error signing out:", error);
            });
    };


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, set the user data in state
                setUser(user);

            } else {
                // User is signed out
                LogoutAndRedirect();
            }
        });

        // Unsubscribe from the listener when the component unmounts
        return () => unsubscribe();
    }, [user]);

    const LogoutAndRedirect = () => {
        signOut(auth)
            .then(() => {
                navigate("/login"); // Use navigate to go to the login page
            })
            .catch((error) => {
                console.error("Error logging out:", error);
            });
    };

    return (
        <authContext.Provider value={{ isRegistered, setIsRegistered, user, setUser, HandleSignup, Logout, SignIn, auth }}>{children}</authContext.Provider>
    )
}