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
    let unsubData = null;

    const unsubAuth = auth.onAuthStateChanged((user) => {
      if (!user) {
        setDocuments([]);
        return;
      }

      const ref = collection(db, collectionName);
      const q = query(
        ref,
        where("uid", "==", user.uid),
        orderBy("createdAt", "desc"),
      );

      unsubData = onSnapshot(
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
    });

    return () => {
      if (unsubData) unsubData();
      unsubAuth();
    };
  }, [collectionName]);

  return { documents };
};
