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
                    <a href="/" className="enlace">Inicio</a>
                    <a href="/" className="enlace">Entregas</a>
                </nav>
            </div>
        </header>

    )

}

export default Navbar