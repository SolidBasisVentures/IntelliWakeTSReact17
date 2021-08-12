import React from 'react';
export interface IWCardProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
    tag?: string | React.ReactType;
}
export declare const Card: React.ForwardRefExoticComponent<IWCardProps & React.RefAttributes<HTMLDivElement>>;
