import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="navbar navbar-expand-lg sticky-top mb-4">
            <div className="container">
                <Link className="navbar-brand" to="/">🚀 ApplyCheck</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item">
                            <Link className="nav-link mx-2" to="/">Resume Builder</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link mx-2 btn btn-outline-primary py-2 px-4 ms-lg-3 me-3" to="/analyze" style={{ color: theme === 'dark' ? 'white' : 'var(--primary)' }}>ATS Analyzer</Link>
                        </li>
                        <li className="nav-item">
                            <button className="theme-toggle" onClick={toggleTheme} title="Toggle Theme">
                                {theme === 'dark' ? '☀️' : '🌙'}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
