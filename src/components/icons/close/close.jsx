import React from 'react';

const CloseIcon = (props) => {
    const colour = props.colour || "#000000";
    return (
        <svg width="17px" height="17px" viewBox="0 0 17 17" version="1.1">
            <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round">
                <g id="24-px-Icons" transform="translate(-364.000000, -124.000000)" stroke={colour}>
                    <g id="ic_cancel" transform="translate(360.000000, 120.000000)">
                        <g id="cross">
                            <g transform="translate(5.000000, 5.000000)" strokeWidth="2">
                                <path d="M0,0 L14.1421356,14.1421356" id="Line"></path>
                                <path d="M14,0 L1.77635684e-15,14" id="Line"></path>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    )
}

export default CloseIcon;