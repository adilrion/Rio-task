import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FirebaseApp } from "../config/firebase"; // Import your Firebase configuration


const authContext = createContext();


export const useAuthContext = () => {
    return useContext(authContext);
};


const auth = getAuth(FirebaseApp);
const db = getFirestore(FirebaseApp);
const formData = collection(db, "user");

// Function to add a user to Firestore
const addUser = async (email, name, userId) => {
    try {
        const data = await addDoc(formData, {
            email: email,
            name: name,
            userId: userId,
        });
        console.log("User added to Firestore:", data);
    } catch (error) {
        console.error("Error adding user to Firestore:", error);
    }
};





export const AuthContext = ({ children }) => {

    const [isRegistered, setIsRegistered] = useState(false);
    const [user, setUser] = useState(null)
    const [authError, setAuthError] = useState(null)
    const [userData, setUserDate] = useState(null)
    const navigate = useNavigate();




    const HandleSignup = async (email, password, name, setIsRegistered) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            // Set the user's display name
            await updateProfile(userCredential?.user, {
                displayName: name,
            });

            const newUser = userCredential?.user;
            setIsRegistered(true);
            setUser(newUser)
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
                setUser(userCredential?.user)
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


    

    useEffect(() => {
        const getUsers = async () => {
            try {
                const querySnapshot = await getDocs(formData);
                const userDataArray = [];
                querySnapshot.forEach((doc) => {
                    userDataArray.push(doc.data());
                });
                setUserDate(userDataArray);
                
            } catch (error) {
                console.error('Error fetching documents:', error);
            }
        };

        getUsers();
    }, []);






    return (
        <authContext.Provider value={{ isRegistered, setIsRegistered, user, setUser, HandleSignup, Logout, SignIn, auth, userData }}>{children}</authContext.Provider>
    )
}