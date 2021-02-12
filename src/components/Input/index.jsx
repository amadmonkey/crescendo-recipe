import React from 'react';
import './style.scss';

const Input = (props) => {
    console.log(props.errors);
    return (
        <div style={{ ...props.style }}>
            {
                props.text &&
                <div className={`text ${props.errors ? 'danger' : ''}`} style={props.style}>
                    <input type="text" {...props.attr} ref={props.register} onChange={props.onChange} />
                </div>
            }
            {
                props.textArea &&
                <div className={`textarea ${props.errors ? 'danger' : ''}`} style={props.style}>
                    <textarea rows="5" {...props.attr} ref={props.register} onChange={props.onChange} ></textarea>
                </div>
            }
            {
                props.number &&
                <div className={`number ${props.errors ? 'danger' : ''}`} style={props.style}>
                    <input type="number" {...props.attr} ref={props.register} onChange={props.onChange} />
                </div>
            }
            {props.errors && <span className="error-message">{props.errors.message}</span>}
        </div>
    )
}


export default Input
