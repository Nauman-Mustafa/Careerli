import React from 'react';
import { Button } from "react-bootstrap";
import PropTypes from 'prop-types';

interface IProps {
    loading: boolean
    className: string
    onClick: Function
    label: string
    type: 'button' | 'submit' | 'search' | 'reset'
}

export const ButtonCustom = (props: IProps) => {

    const className = `btn ${props.className || ''}`;
    let _props = {
        ...props,
        type: props.type || 'button',
        className
    }
    const onClick = () => {
        if (props.onClick) props.onClick();
    }

    return (
        <button type={props.type as any} onClick={onClick} className={className} disabled={props.loading}>
            {
                props.loading ? 'Please wait...' : props.label || 'Submit'
            }
        </button>
    )
}
