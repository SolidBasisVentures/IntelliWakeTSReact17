import React from 'react';
export declare enum EFieldSetGroupings {
    Half = 0,
    Thirds = 1,
    TwoThirds = 2,
    QuartersEven = 3,
    QuartersSmallLabel = 4,
    LabelOver = 5
}
export declare type TFieldSetBreakAt = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export interface IFieldSetPropsAddOns {
    breakAt?: TFieldSetBreakAt;
    groupings?: EFieldSetGroupings;
    hidden?: boolean;
    condensed?: boolean;
    fluid?: boolean;
    fillHeight?: boolean;
    fillHeightScroll?: boolean;
}
export interface IFieldSetProps extends React.HTMLProps<HTMLFieldSetElement>, IFieldSetPropsAddOns {
}
interface IFieldSetContext extends Required<IFieldSetPropsAddOns> {
    uuid: string;
}
export declare const FieldSetContext: React.Context<IFieldSetContext>;
export declare const FieldSet: (props: IFieldSetProps) => JSX.Element;
export {};
