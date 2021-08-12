import React from 'react';
export interface IWAlertProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
    color?: string;
    tag?: string | React.ReactType;
    isOpen?: boolean;
    toggle?: () => void;
}
export declare const Alert: (props: IWAlertProps) => JSX.Element;
