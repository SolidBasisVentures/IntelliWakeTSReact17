import React from 'react';
export interface IWBreadCrumbItemProps extends Omit<React.HTMLProps<HTMLLIElement>, 'ref'> {
    active?: boolean;
}
export declare const BreadCrumbItem: (props: IWBreadCrumbItemProps) => JSX.Element;
