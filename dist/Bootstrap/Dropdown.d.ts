import React, { CSSProperties, ReactNode } from 'react';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
export declare type Direction = 'up' | 'down' | 'left' | 'right';
export interface IDDAction {
    hidden?: boolean;
    divider?: boolean;
    disabled?: boolean;
    header?: boolean;
    faProps?: FontAwesomeIconProps;
    faPropHidden?: boolean;
    active?: boolean;
    title?: ReactNode;
    action?: () => void;
    color?: string;
    className?: string;
}
export interface IWDropdownProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref' | 'size'> {
    disabled?: boolean;
    direction?: Direction;
    isOpen?: boolean;
    nav?: boolean;
    tag?: string | React.ReactType;
    toggle?: React.KeyboardEventHandler<any> | React.MouseEventHandler<any>;
    size?: 'sm' | 'lg';
    color?: string;
    block?: boolean;
    inNavbar?: boolean;
    right?: boolean;
    buttonLabel?: ReactNode;
    buttonFAProps?: FontAwesomeIconProps;
    buttonClassName?: string;
    menuClassName?: string;
    noCaret?: boolean;
    menuStyle?: CSSProperties;
    ddActions?: IDDAction[] | (() => IDDAction[]);
}
export declare const Dropdown: (props: IWDropdownProps) => JSX.Element | null;
