import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Times } from '../../img/times.svg';
import Tooltip from '../Tooltip';
import './style.scss';

const Card = (props) => {

    const [loading, setLoading] = useState(false);
    let title = props.title;

    return (
        <div className={`card ${props.className}`} style={{ paddingTop: title ? "45px" : "25px", marginBottom: props.showMore ? '30px' : '30px' }}>
            {
                props.title &&
                <header className="card-header">
                    <h1>{title}</h1>
                    {
                        props.link &&
                        <div className="header-link-container">
                            <Link className="header-link" to={props.link.to}>{props.link.label}</Link>
                        </div>
                    }
                </header>
            }
            { props.children}
            {
                props.showMore &&
                <footer>
                    <Tooltip label="Delete" dark>
                        <button onClick={() => props.delete(props.index)} className="bg-danger"><Times /></button>
                    </Tooltip>
                </footer>
            }
        </div >
    )
}

export default Card
