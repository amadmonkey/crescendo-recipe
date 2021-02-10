import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../img/robomonkey.svg';
import './style.scss';

const Header = () => {

    const [profileActive, setProfileActive] = useState(false);

    return (
        <header className="main-header">
            <div className="bar">
                <Link to="/"><img src={Logo} alt="Logo" /></Link>
                {/* <nav>
                    <ul>
                        <li><Link to="/">Dashboard</Link></li>
                        <li><Link to="/activity">Activity</Link></li>
                        <li><Link to="/sheets">Sheets</Link></li>
                        <li><Link to="/classrooms">Classrooms</Link></li>
                        <li><a onClick={() => setProfileActive(!profileActive)}>Kamote <span>&rsaquo;</span></a></li>
                    </ul>
                </nav> */}
            </div>
        </header>
    )
}

export default Header
