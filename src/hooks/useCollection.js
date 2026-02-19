import { useState, useEffect } from "react";
import { db, auth } from "../firebase/config";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";

export const useCollection = (collectionName) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) {
      setDocuments([]);
      return;
    }

    const ref = collection(db, collectionName);

    const q = query(
      ref,
      where("uid", "==", auth.currentUser.uid),
      orderBy("createdAt", "desc"),
    );

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const results = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setDocuments(results);
      },
      (error) => {
        console.error("Firestore read error:", error.message);
      },
    );

    return () => unsub();
  }, [collectionName]);

  return { documents };
};
