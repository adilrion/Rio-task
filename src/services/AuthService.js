import {
    createUserWithEmailAndPassword,
    getAuth,
    updateProfile,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { FirebaseApp } from "../config/firebase";


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

export const HandleSignup = async (email, password, name, setIsRegistered) => {
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

        const user = userCredential.user;
        console.log(user);
        setIsRegistered(true);
        addUser(user.email, name, user.uid);
    } catch (error) {
        // setAuthError(error);
        console.error("Error signing up:", error.message);
    }
};

