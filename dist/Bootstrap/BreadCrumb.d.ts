import React from 'react';
export interface IWBreadCrumbProps extends Omit<React.HTMLProps<HTMLOListElement>, 'ref'> {
    classNameLI?: string;
}
export declare const BreadCrumb: (props: IWBreadCrumbProps) => JSX.Element;
