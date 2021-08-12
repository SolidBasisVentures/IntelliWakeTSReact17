import React, { ReactNode } from 'react';
export interface IIWProgressBar {
    minAmount?: number;
    maxAmount?: number;
    nowAmount: number;
    striped?: boolean;
    animated?: boolean;
    color?: string;
    children?: ReactNode;
}
export interface IIWProgressProps extends IIWProgressBar, React.HTMLProps<HTMLDivElement> {
    height?: string;
    hidden?: boolean;
    otherBars?: IIWProgressBar[];
}
export declare const Progress: (props: IIWProgressProps) => JSX.Element;
