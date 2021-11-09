import React, { ReactNode } from 'react';
export interface IWButtonLightProps {
    size?: 'sm' | 'lg';
    block?: boolean;
    color?: string;
    outline?: boolean;
    hidden?: boolean;
    disabled?: boolean;
    style?: React.CSSProperties;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    children?: ReactNode;
    title?: string;
    to?: string;
    active?: boolean;
}
export interface IIWButtonProps extends IWButtonLightProps, Omit<React.HTMLProps<HTMLButtonElement>, 'size' | 'ref'> {
    tag?: string | React.ReactType;
    autoFocus?: boolean;
    classNameOverride?: string;
}
export declare const Button: React.ForwardRefExoticComponent<IIWButtonProps & React.RefAttributes<HTMLButtonElement>>;
