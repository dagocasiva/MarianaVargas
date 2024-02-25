import { Link, useNavigate } from "react-router-dom";


const ItemDetail = ({ item }) => {
    const navigate = useNavigate()


    const handleVolver = () => {
        navigate(-1)
    }

    return (
        <div className="detail">
            <button onClick={handleVolver} className="botonVolver">Volver atras</button>
            <div className="descripcionVestido">
                <h3>{item.nombre}</h3>
                <p>{item.disponibilidad}</p>
            </div>


            <div className="divVestido">
                <img src={item.imagen} alt={item.nombre} />

                <div>
                    <p>Estado{item.disponibilidad}</p>
                    
                </div>
            </div>
        </div>
    );
};

export default ItemDetail;