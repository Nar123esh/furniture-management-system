import { useEffect, useState } from "react";
import { db } from '../firebase.config';
import { collection, onSnapshot } from "firebase/firestore";

const useGetData = (collectionName) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const collectionRef = collection(db, collectionName);

    useEffect(() => {
        const getData = async () => {
            try {
                await onSnapshot(collectionRef, (snapshot) => {
                    setData(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
                    setLoading(false);
                });
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        getData();
    }, [collectionRef, collectionName]); // Include collectionRef and collectionName in the dependency array

    return { data, loading };
};

export default useGetData;
