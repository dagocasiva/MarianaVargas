import React, { useState } from "react";
import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import Swal from 'sweetalert2/src/sweetalert2.js'

const AgregarVestido = () => {
    const [nombre, setNombre] = useState("");
    const [color, setColor] = useState("");
    const [disponibilidad, setDisponibilidad] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(db, "vestidos"), {
                nombre,
                color,
                disponibilidad
            });
            Swal.fire({
                title: "Felicitaciones!",
                text: `El vestido ${nombre} fue añadido correctamente. Por favor, recargue la pagina para poder encontrarlo`,
                icon: "success"}),
            setNombre("");
            setColor("");
            setDisponibilidad("");
        } catch (error) {
            Swal.fire({
                title: "Ups!",
                text: "Hubo un error agregando el vestido, por favor intenta nuevamente",
                icon: "error",})
        };
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nombre:
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </label>
            <label>
                Color:
                <input type="text" value={color} onChange={(e) => setColor(e.target.value)} required />
            </label>
            <label>
                Disponibilidad:
                <input type="text" value={disponibilidad} onChange={(e) => setDisponibilidad(e.target.value)} required />
            </label>
            <button type="submit">Añadir Vestido</button>
        </form>
    );
};

export default AgregarVestido 
