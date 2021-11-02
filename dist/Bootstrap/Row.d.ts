import React from 'react';
export interface IIWRowProps extends React.HTMLProps<HTMLDivElement> {
    noGutters?: boolean;
    className?: string;
    children?: any;
    fillHeight?: boolean;
    fillHeightScroll?: boolean;
}
export declare const Row: (props: IIWRowProps) => JSX.Element;
