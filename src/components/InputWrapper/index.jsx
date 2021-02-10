import React from 'react';
import './style.scss';

const InputWrapper = (props) => {
    return (
        <div className="input-wrapper" style={props.style}>
            {
                props.label && <label htmlFor={props.htmlFor} className={props.htmlFor && props.errors[props.htmlFor] && Object.keys(props.errors[props.htmlFor]).length && 'danger'}>{props.label}</label>
            }
            {props.children}
        </div>
    )
}

export default InputWrapper
