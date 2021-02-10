import React from 'react';
import './style.scss';

const Footer = () => {
    let d = new Date();
    return (
        <footer className="main-footer">
            <span>
                {`© ${d.getFullYear()} Arcie Aquino. All rights reserved.`}
            </span>
        </footer>
    )
}

export default Footer
