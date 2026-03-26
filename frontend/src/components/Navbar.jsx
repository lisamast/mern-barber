function Navbar({ token, onNavigate, onLogout, currentPage }) {
    return (
        <nav>
            <div>
                <ul>
                    {!token ? (
                        <>
                            <li>
                                <button
                                    onClick={() => onNavigate('login')}
                                >
                                    Inloggen
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => onNavigate('register')}
                                >
                                    Registreren
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <button
                                    onClick={() => onNavigate('appointments')}
                                >
                                    Mijn Afspraken
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => onNavigate('book')}
                                >
                                    Afspraak Boeken
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={onLogout}
                                >
                                    Uitloggen
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
