import React from 'react';
export interface IIWTableProps {
    bordered?: boolean;
    borderless?: boolean;
    striped?: boolean;
    hover?: boolean;
    size?: 'sm' | 'lg';
    responsive?: boolean;
    dark?: boolean;
    caption?: string;
    textSmall?: boolean;
    className?: string;
    sticky?: boolean;
    sortable?: boolean;
    tabIndex?: number;
    hidden?: boolean;
    style?: React.StyleHTMLAttributes<HTMLTableElement>;
    ref?: any;
    children?: any;
    onKeyDown?: React.KeyboardEventHandler;
}
export declare const IWTable: (props: IIWTableProps) => JSX.Element;
