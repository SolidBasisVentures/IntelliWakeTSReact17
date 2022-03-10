import React, { ReactNode } from 'react';
export interface IPropsInputSearch {
    initialValue?: string;
    triggerSearchText: (value: string) => void;
    triggerDelayAmount?: number;
    triggerOnEnter?: boolean;
    className?: string;
    style?: any;
    placeholder?: string;
    id?: string;
    bordered?: boolean;
    reactPrefix?: ReactNode;
    inputGroupClass?: string;
    size?: 'lg' | 'sm';
    autoFocus?: boolean;
    onKeyDown?: (e: React.KeyboardEvent) => void;
    onFocus?: (e: React.FocusEvent) => void;
    noSelectOnFocus?: boolean;
    autoCompleteOn?: boolean;
}
/**
 * A search input with an option to have a trigger delay or not.
 */
export declare const InputSearch: React.ForwardRefExoticComponent<IPropsInputSearch & React.RefAttributes<HTMLInputElement>>;
