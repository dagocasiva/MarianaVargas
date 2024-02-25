import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ItemList from "./ItemList";
import Loader from "./Loader"
import { db } from "../../firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";


const ItemListContainer = () => {
    const [vestidos, setVestidos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [busqueda, setBusqueda] = useState("");
    const [vestidosOriginales, setVestidosOriginales] = useState([]);

    const { colorId } = useParams()

    useEffect(() => {
        setCargando(true)

        const vestidosRef = collection(db, 'vestidos')
        const docsRef = colorId
            ? query(vestidosRef, where('color', '==', colorId))
            : vestidosRef
        getDocs(docsRef)
            .then((querySnapshot) => {
                const docs = querySnapshot.docs.map(doc => {
                    return {
                        ...doc.data(),
                        id: doc.id
                    }
                })
                setVestidos(docs)
                setVestidosOriginales(docs);
            })
            .finally(() => setCargando(false))
    }, [colorId])

    useEffect(() => {
        if (busqueda !== "") {
            const busquedaMin = busqueda.toLowerCase();
            const resultados = vestidosOriginales.filter(vestido =>
                (vestido.nombre && vestido.nombre.toLowerCase().includes(busquedaMin)) ||
            (vestido.color && vestido.color.toLowerCase().includes(busquedaMin)) ||
            (vestido.disponibilidad && vestido.disponibilidad.toLowerCase().includes(busquedaMin))
        );
            setVestidos(resultados);
        } else {
            setVestidos(vestidosOriginales);
        }
    }, [busqueda, vestidosOriginales]);

    const handleBusquedaChange = (event) => {
        setBusqueda(event.target.value);
    };

    return (
        <div>
            <input
                className="buscador"
                type="text"
                value={busqueda}
                onChange={handleBusquedaChange}
                placeholder="Buscar vestidos..."
            />
            {cargando ? (
                <Loader />
            ) : (
                <ItemList vestidos={vestidos} />

            )
            }
        </div>

    )

}
export default ItemListContainer