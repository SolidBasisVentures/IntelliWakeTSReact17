import React from 'react';
export interface IIWTableProps extends Omit<React.HTMLProps<HTMLTableElement>, 'ref' | 'size'> {
    bordered?: boolean;
    borderless?: boolean;
    striped?: boolean;
    hover?: boolean;
    size?: 'sm' | 'lg';
    responsive?: boolean;
    dark?: boolean;
    caption?: string;
    textSmall?: boolean;
    legacySticky?: boolean;
    sortable?: boolean;
}
export declare const Table: React.ForwardRefExoticComponent<IIWTableProps & React.RefAttributes<HTMLTableElement>>;
