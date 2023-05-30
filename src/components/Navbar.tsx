import React from "react";
import { Link } from "react-router-dom"
import '../scss/style.css';

const Navbar: React.FC = () => (
    <div className="nav">
        <nav className="nav__content">
            <ul className="nav__list">
                <li className="nav__item"><Link className="nav__link" to="time">Время</Link></li>
                <li className="nav__item"><Link className="nav__link" to= "Forecast">Погода</Link></li>
            </ul>
        </nav>
    </div>
)

export default Navbar;