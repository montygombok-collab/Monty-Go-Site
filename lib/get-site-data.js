// lib/get-site-data.js
import { db } from "./firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function getSiteData(subdomain) {
    try {
        const sitesRef = collection(db, "sites");
        const q = query(sitesRef, where("subdomain", "==", subdomain));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return null;
        }

        let siteData = null;
        querySnapshot.forEach((doc) => {
            siteData = { id: doc.id, ...doc.data() };
        });

        return siteData;
    } catch (error) {
        console.error("Error fetching site data:", error);
        return null;
    }
}
