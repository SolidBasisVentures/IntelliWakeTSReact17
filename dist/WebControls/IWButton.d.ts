import React from 'react';
export interface IIWButtonProps {
    size?: 'sm' | 'lg';
    color?: string;
    outline?: boolean;
    hidden?: boolean;
    disabled?: boolean;
    block?: boolean;
    style?: React.CSSProperties;
    type?: 'button' | 'submit' | 'reset';
    autoFocus?: boolean;
    className?: string;
    onClick?: React.MouseEventHandler;
    tabIndex?: number;
    ref?: any;
    children?: any;
    onKeyDown?: React.KeyboardEventHandler;
    onKeyPress?: React.KeyboardEventHandler;
}
export declare const IWButton: (props: IIWButtonProps) => JSX.Element;
