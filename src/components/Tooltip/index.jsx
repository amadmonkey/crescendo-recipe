import React, { useState } from 'react';
import './style.scss';

const Tooltip = (props) => {

    const [active, setActive] = useState(false);

    const hover = (e, status) => {
        e.stopPropagation();
        setActive(status);
    }

    return (
        <div onMouseEnter={(e) => hover(e, true)} onMouseLeave={(e) => hover(e, false)} className={`tooltip ${props.dark ? 'dark' : ''}`}>
            <div className={active ? 'active' : ''}>
                <span>{props.label}</span>
            </div>
            {props.children}
        </div>
    )
}

export default Tooltip
