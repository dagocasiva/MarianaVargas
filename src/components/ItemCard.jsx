import React from "react";
import { db } from "../../firebase/config";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import Swal from 'sweetalert2/src/sweetalert2.js'

const ItemCard = ({ item }) => {
    const [nuevaDisponibilidad, setNuevaDisponibilidad] = useState("disponible");
    const [editando, setEditando] = useState(false);
    const [fechaAlquilerDesde, setFechaAlquilerDesde] = useState("");
    const [fechaAlquilerHasta, setFechaAlquilerHasta] = useState("");

    const diasRestantes = calcularDiasRestantes(item.fechaAlquilerHasta);
    const handleDelete = async () => {

        try {
            await deleteDoc(doc(db, "vestidos", item.id));
            Swal.fire({
                title: "Felicitaciones!",
                text: `El producto fue eliminado correctamente. Por favor, recargue la pagina para poder encontrarlo`,
                icon: "success"
            })
        } catch (error) {
            Swal({
                title: "Ups!",
                text: "Hubo un error agregando el vestido, por favor intenta nuevamente",
                icon: "error",
            });
        }
    };

    const handleChangeDisponibilidad = (e) => {
        setNuevaDisponibilidad(e.target.value);
    };

    const handleChangeFechaAlquilerDesde = (e) => {
        setFechaAlquilerDesde(e.target.value);
    };

    const handleChangeFechaAlquilerHasta = (e) => {
        setFechaAlquilerHasta(e.target.value);
    };

    const handleSubmitDisponibilidad = async (e) => {
        e.preventDefault();
        try {
            const newData = {
                disponibilidad: nuevaDisponibilidad
            };
            if (nuevaDisponibilidad === "alquilado") {
                newData.fechaAlquilerDesde = fechaAlquilerDesde;
                newData.fechaAlquilerHasta = fechaAlquilerHasta;
            }
            await updateDoc(doc(db, "vestidos", item.id), newData);
            console.log("Producto actualizado correctamente");
            setEditando(false);
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
        }
    };


    return (
        <div className="cardContainer">
            <img src={item.imagen} alt={item.nombre} className="imagenVestido" />
            <h3 className="nombreVestido">{item.nombre}</h3>
            <p className="estadoVestido" style={{ color: getColor(item.disponibilidad) }}>
                {item.disponibilidad === "alquilado" ?
                    `Alquilado desde: ${formatDate(item.fechaAlquilerDesde)} hasta: ${formatDate(item.fechaAlquilerHasta)}`
                    :
                    item.disponibilidad
                }
            </p>

            {item.disponibilidad === "alquilado" && diasRestantes < 5 && (
                <p className="advertencia"><span>¡Atención!</span> Quedan menos de 5 días de alquiler.</p>
            )}
            <p className="colorVestido">Color: {item.color.toUpperCase()}</p>
            <div className="botones">
                <button className="eliminar" onClick={handleDelete}>Eliminar</button>
                {editando ? (
                    <form onSubmit={handleSubmitDisponibilidad}>
                        <select defaultValue={nuevaDisponibilidad} onChange={handleChangeDisponibilidad}>
                            <option value="disponible">Disponible</option>
                            <option value="arreglo">Arreglo</option>
                            <option value="alquilado">Alquilado</option>
                        </select>
                        {nuevaDisponibilidad === "alquilado" && (
                            <div className="alquilado">
                                <label>
                                    Desde:
                                    <input type="date" value={fechaAlquilerDesde} onChange={handleChangeFechaAlquilerDesde} required />
                                </label>
                                <label>
                                    Hasta:
                                    <input type="date" value={fechaAlquilerHasta} onChange={handleChangeFechaAlquilerHasta} required />
                                </label>

                            </div>

                        )}
                        <button type="submit">Guardar</button>
                    </form>
                ) : (
                    <button onClick={() => setEditando(true)}>Editar</button>
                )}
            </div>

        </div>
    );
};

const formatDate = dateStr => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString();
};

const getColor = disponibilidad => {
    switch (disponibilidad) {
        case 'disponible':
            return 'green';
        case 'arreglo':
            return 'orange';
        case 'alquilado':
            return 'red';
        default:
            return 'black';
    }
};

const calcularDiasRestantes = fecha => {
    const fechaAlquiler = new Date(fecha);
    const hoy = new Date();
    const diferencia = fechaAlquiler.getTime() - hoy.getTime();
    return Math.ceil(diferencia / (1000 * 3600 * 24)); // Convertir diferencia a días y redondear hacia arriba
};



export default ItemCard;
