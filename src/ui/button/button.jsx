import React from 'react';
import styles from './button.module.css';

const Button = (props) => {
    return (
        <button
            onClick={props?.onClick}
            className={`${props?.className} ${styles.button}`}
            style={props?.style}
            type={props?.type}
            disabled={props?.disabled || false}
        >
            {props.children}
        </button>
    )
}

export default Button;