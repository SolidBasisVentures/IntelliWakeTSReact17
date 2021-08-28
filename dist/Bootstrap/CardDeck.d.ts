import React from 'react';
import { TFieldSetBreakAt } from './FieldSet';
export interface IWCardDeckProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
    tag?: string | React.ReactType;
    breakAt?: TFieldSetBreakAt;
    smallRows?: number;
    largeRows?: number;
}
export declare const CardDeck: (props: IWCardDeckProps) => JSX.Element;
