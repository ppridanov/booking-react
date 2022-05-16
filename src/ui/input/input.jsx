import React from 'react';
import styles from './input.module.css';

const Input = (props) => {
    const [focused, setFocused] = React.useState(false);
    return (
        <>
            {props.label && (
                <label className={`${styles.label} ${focused && styles.labelFocus} }`}>{props.label}</label>
            )}
            <input
                type={props.type || 'text'}
                onKeyUp={(e) => {e.target.value.length < 1  ? setFocused(false) : setFocused(true)}}
                id={props.id}
                className={`${props.className} ${styles.input}`}
                placeholder={props.placeholder}
                name={props.name}
                required={props.required || false}
                onFocus={(e) => setFocused(true)}
                autoComplete="off"
                onClick={(e) => setFocused(true)}
                value={props?.value ? props.value : ''}
                disabled={props?.disabled ? true : false}
                defaultValue={props?.defaultValue}
                readOnly={props?.readOnly}
                onChange={props?.onChange}
            />
        </>

    )
}

export default Input;