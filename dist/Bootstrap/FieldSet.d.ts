import React, { ReactNode, ReactNodeArray } from 'react';
export declare enum EFieldSetGroupings {
    Half = 0,
    Thirds = 1,
    TwoThirds = 2,
    QuartersEven = 3,
    QuartersSmallLabel = 4,
    LabelOver = 5
}
export declare type TFieldSetBreakAt = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export interface IFieldSetProps {
    breakAt?: TFieldSetBreakAt;
    groupings?: EFieldSetGroupings;
    children?: ReactNode | ReactNodeArray;
    className?: string;
    hidden?: boolean;
    condensed?: boolean;
    fluid?: boolean;
}
interface IFieldSetContext extends Required<Omit<IFieldSetProps, 'children' | 'className'>> {
    uuid: string;
}
export declare const FieldSetContext: React.Context<IFieldSetContext>;
export declare const FieldSet: (props: IFieldSetProps) => JSX.Element;
export {};
