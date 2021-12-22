import React, { CSSProperties, ReactNode } from 'react';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
export declare type Direction = 'up' | 'down' | 'left' | 'right';
export interface IDDAction {
    hidden?: boolean;
    divider?: boolean;
    disabled?: boolean;
    header?: boolean;
    headerGroup?: ReactNode;
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
    outline?: boolean;
    block?: boolean;
    inNavbar?: boolean;
    right?: boolean;
    buttonLabel?: ReactNode;
    buttonFAProps?: FontAwesomeIconProps;
    buttonClassName?: string;
    menuClassName?: string;
    noCaret?: boolean;
    menuStyle?: CSSProperties;
    maxWidth?: string;
    maxWidthAction?: string | false;
    allowWrap?: boolean;
    ddActions?: IDDAction[] | (() => IDDAction[]);
}
export declare const Dropdown: (props: IWDropdownProps) => JSX.Element | null;
