import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "./firebase";


export const useUserStore = create((set) => ({
    currentUser: null,
    fetchUserInfo: async (uid) => {
        if (!uid) return set({ currentUser: null });

        try {

            const docRef = doc(db, "users", uid); // address of the document
            const docSnap = await getDoc(docRef); // commanding firestore to fetch the document matching with docRef and store here

            if (docSnap.exists()) {
                set({ currentUser: docSnap.data() });
            } else {
                set({ currentUser: null })
            }

        } catch (err) {
            return set({ currentUser: null });
        }
    }
}))
