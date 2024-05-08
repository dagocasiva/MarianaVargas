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
    const [cantidadInicial, setCantidadInicial] = useState(20);

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
                    const data = doc.data();
                    return {
                        ...data,
                        id: doc.id,
                        disponibilidad: data.disponibilidad 
                    };
                })
                setVestidos(docs.slice(0, cantidadInicial));
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
            setVestidos(resultados.slice(0, cantidadInicial));
        } else {
            setVestidos(vestidosOriginales.slice(0, cantidadInicial));
        }
    }, [busqueda, vestidosOriginales, cantidadInicial]);

    const handleBusquedaChange = (event) => {
        setBusqueda(event.target.value);
    };
    
    const handleVerMas = () => {
        // Incrementar la cantidad de vestidos a cargar al hacer clic en "Ver más"
        setCantidadInicial(prevCantidad => prevCantidad + 20); // Puedes ajustar el incremento como desees
    };

    return (
        <div className="vestidos">
            
            {cargando ? (
                <Loader />
            ) : (
                <div>
                    <input
                        className="buscador"
                        type="text"
                        value={busqueda}
                        onChange={handleBusquedaChange}
                        placeholder="Buscar vestidos..."
                    />
                    {vestidos.length === 0 ? (
                        <div className="sinVestidos">
                            <p>No se encontraron vestidos.</p>
                        </div>
                    ) : (
                        <div className="inicio">
                            <ItemList vestidos={vestidos} />
                            <button className="verMas" onClick={handleVerMas}>Ver Más</button>
                        </div>
                    )}
                </div>
            )}
        </div>

    )
}
export default ItemListContainer