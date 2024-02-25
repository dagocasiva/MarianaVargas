import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "../../src/components/ItemDetail";
import Loader from "../../src/components/Loader";
import { db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";


const ItemDetailContainer = () => {
    const [cargando, setCargando] = useState(true);
    const [item, setItem] = useState({});

    const { itemId } = useParams()
    useEffect(() => {
        setCargando(true);
            const docRef = doc(db, 'vestidos', itemId)
            getDoc(docRef)
            .then((docSnapshot) => {
                const doc = {
                    ...docSnapshot.data(),
                    id: docSnapshot.id
                }
                setItem(doc)
            })
            .finally(() => setCargando(false));
    }, [itemId]);

    return (
        <>
            {cargando ? (
                <Loader />
            ) : (
                <ItemDetail item={item} />
            )}
        </>
    );
};

export default ItemDetailContainer;
