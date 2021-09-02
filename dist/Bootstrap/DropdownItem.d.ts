import React from 'react';
export interface IWDropdownItemProps extends Omit<React.HTMLProps<HTMLBaseElement>, 'ref'> {
    disabled?: boolean;
    tag?: string | React.ReactType;
    href?: string;
    divider?: boolean;
    header?: boolean;
    loading?: boolean;
    active?: boolean;
    maxWidth?: string;
}
export declare const DropdownItem: (props: IWDropdownItemProps) => JSX.Element;
