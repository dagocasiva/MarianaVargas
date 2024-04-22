import {NavLink } from "react-router-dom";

const enlaces = [
    {
        nombre: "Inicio",
        enlace: "/",
    },
    {
        nombre: "Agregar",
        enlace: "/nuevo-vestido",
    },
    // {
    //     nombre: "Entregas",
    //     enlace: "/entregas",
    // },
];

const Navbar = () => {
    return (

        <header className="header">
            <div className="containerNavbar">
                
                <div className='logo'>
                    <a href="/">
                        {/* <img src="" alt="logo" className='imagenLogo' />  */}
                        <h1 className="titulo">MarianaVargas</h1>
                    </a>

                </div>

                <nav>
                    {enlaces.map((enlace) => (

                        <NavLink
                            key={enlace.enlace}
                            to={enlace.enlace}
                            className="enlace"
                        >
                            {enlace.nombre}
                        </NavLink>

                    ))}
                </nav>
            </div>
        </header>

    )

}

export default Navbar