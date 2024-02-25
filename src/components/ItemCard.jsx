import { Link } from "react-router-dom";

const ItemCard = ({ item }) => {

    return (
            <div className="cardContainer">
                <img src={item.imagen} alt={item.nombre} className="imagenVestido"/>
                <h3 className="nombreVestido">{item.nombre}</h3>
                <p className="estadoVestido">Estado: {item.disponibilidad}</p>
                <p className="estadoVestido">Color: {item.color}</p>

            </div>
        );
    };

export default ItemCard;
