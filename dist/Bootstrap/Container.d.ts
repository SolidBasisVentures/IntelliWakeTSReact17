import React from 'react';
export interface IIWContainerProps extends React.HTMLProps<HTMLDivElement> {
    fluid?: boolean | string;
    className?: string;
    children?: any;
    fillHeight?: boolean;
    fillHeightScroll?: boolean;
}
export declare const Container: (props: IIWContainerProps) => JSX.Element;
