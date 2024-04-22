import React, { useState } from "react";
import { db } from "../../firebase/config";
import { storage } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { uploadFile } from "../../firebase/config";
import Swal from 'sweetalert2/src/sweetalert2.js'


const AgregarVestido = () => {
    const [nombre, setNombre] = useState("");
    const [color, setColor] = useState("");
    const [file, setFile] = useState(null);
    const [disponibilidad, setDisponibilidad] = useState("disponible");
    const [fechaAlquilerDesde, setFechaAlquilerDesde] = useState("");
    const [fechaAlquilerHasta, setFechaAlquilerHasta] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        let result;
        try {
            result = await uploadFile(file);
            console.log(result);
        } catch (error) {
            console.error(error);
        }
        const nombreMinuscula = nombre.toLowerCase();
        const colorMinuscula = color.toLowerCase();
        const disponibilidadMinuscula = disponibilidad.toLowerCase();


        try {
            await addDoc(collection(db, "vestidos"), {
                nombre: nombreMinuscula,
                color: colorMinuscula,
                imagen: result,
                disponibilidad: disponibilidadMinuscula,
                fechaAlquilerDesde: disponibilidadMinuscula === "alquilado" ? fechaAlquilerDesde : null,
                fechaAlquilerHasta: disponibilidadMinuscula === "alquilado" ? fechaAlquilerHasta : null
            });
            Swal.fire({
                title: "Felicitaciones!",
                text: `El vestido ${nombre} fue añadido correctamente. Por favor, recargue la pagina para poder encontrarlo`,
                icon: "success"
            }),
                setNombre("");
            setColor("");
            setFile("")
            setDisponibilidad("");
            setFechaAlquilerDesde("");
            setFechaAlquilerHasta("");
        } catch (error) {
            Swal.fire({
                title: "Ups!",
                text: `Hubo un error agregando el vestido, por favor intenta nuevamente", ${error}`,
                icon: "error",
            })
        };
    }

    return (
        <form onSubmit={handleSubmit} className="formAgregar">
            <label>
                Nombre:
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </label>
            <label>
                Color:
                <input type="text" value={color} onChange={(e) => setColor(e.target.value)} required />
            </label>
            <label>
                Imagen:
                <input type="file" onChange={(e)=> setFile(e.target.files[0])} required/>
            </label>
            <label>
                Disponibilidad:
                <select name="select" defaultValue={disponibilidad} onChange={(e) => setDisponibilidad(e.target.value)} required>
                    <option value="disponible">Disponible</option>
                    <option value="arreglo">Arreglo</option>
                    <option value="alquilado">Alquilado</option>
                </select>
            </label>
            {disponibilidad === "alquilado" && (
                <div className="alquiler">
                    <label>
                        Alquilado desde:
                        <input type="date" value={fechaAlquilerDesde} onChange={(e) => setFechaAlquilerDesde(e.target.value)} required />
                    </label>
                    <label>
                        Hasta:
                        <input type="date" value={fechaAlquilerHasta} onChange={(e) => setFechaAlquilerHasta(e.target.value)} required />
                    </label>
                </div>

            )}
            <button type="submit">Añadir Vestido</button>
        </form>
    );
};

export default AgregarVestido 
