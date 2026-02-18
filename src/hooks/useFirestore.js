import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";

export const useFirestore = (collectionName) => {
  const addTransaction = async (data, uid) => {
    try {
      const ref = collection(db, collectionName);
      await addDoc(ref, { ...data, uid, createdAt: serverTimestamp() });
    } catch (err) {
      console.error(err.message);
    }
  };

  const updateTransaction = async (id, updates) => {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, updates);
    } catch (err) {
      console.error(err.message);
    }
  };

  return { addTransaction, updateTransaction };
};
