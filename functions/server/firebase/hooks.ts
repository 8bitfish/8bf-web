import { collection, addDoc, getDocs, where, query } from "firebase/firestore";
import { db } from "./firebase";

interface Token {
  primary: string;
  secondary: string;
  pattern: string;
}

const tokenExists = async ({ primary, secondary, pattern }: Token) => {
  const q = query(
    collection(db, "tokens"),
    where("secondary", "==", secondary),
    where("pattern", "==", pattern),
    where("primary", "==", primary)
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return false;
  }
  return true;
};

export const verifyExistence = async ({
  primary,
  secondary,
  pattern,
}: Token) => {
  const exists = await tokenExists({ primary, secondary, pattern });
  if (!exists) {
    try {
      const docRef = await addDoc(collection(db, "tokens"), {
        primary,
        secondary,
        pattern,
      });
      return true;
    } catch (e) {
      throw e;
    }
  }
  return false;
};
