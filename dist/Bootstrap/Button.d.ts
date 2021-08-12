import React, { ReactNode } from 'react';
export interface IWButtonLightProps {
    color?: string;
    outline?: boolean;
    hidden?: boolean;
    disabled?: boolean;
    style?: React.CSSProperties;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    children?: ReactNode;
}
export interface IIWButtonProps extends IWButtonLightProps, Omit<React.HTMLProps<HTMLButtonElement>, 'size' | 'ref'> {
    tag?: string | React.ReactType;
    size?: 'sm' | 'lg';
    block?: boolean;
    autoFocus?: boolean;
    title?: string;
    classNameOverride?: string;
    to?: string;
    active?: boolean;
}
export declare const Button: React.ForwardRefExoticComponent<IIWButtonProps & React.RefAttributes<HTMLButtonElement>>;
