import React from 'react';
export interface IWCardProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
    tag?: string | React.ReactType;
    fillHeight?: boolean;
    fillHeightScroll?: boolean;
}
export declare const Card: React.ForwardRefExoticComponent<IWCardProps & React.RefAttributes<HTMLDivElement>>;
