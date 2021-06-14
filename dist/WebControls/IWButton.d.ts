import React from 'react';
export interface IIWButtonProps {
    size?: 'sm' | 'lg';
    color?: string;
    outline?: boolean;
    type?: 'button' | 'submit';
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
