import React from 'react';
export interface IWCardHeaderProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
    tag?: string | React.ReactType;
    color?: string;
}
export declare const CardHeader: (props: IWCardHeaderProps) => JSX.Element;
