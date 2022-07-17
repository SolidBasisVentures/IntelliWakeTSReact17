import React, { ReactNode } from 'react';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
export interface IPropsInputSearch {
    initialValue?: string;
    triggerSearchText: (value: string) => void;
    triggerDelayAmount?: number | boolean;
    triggerOnEnter?: boolean;
    className?: string;
    style?: any;
    placeholder?: string;
    id?: string;
    bordered?: boolean;
    iconPrefix?: boolean | FontAwesomeIconProps;
    reactPrefix?: ReactNode;
    iconSuffix?: boolean | FontAwesomeIconProps;
    reactSuffix?: ReactNode;
    inputGroupClass?: string;
    size?: 'lg' | 'sm';
    autoFocus?: boolean;
    onKeyDown?: (e: React.KeyboardEvent) => void;
    onFocus?: (e: React.FocusEvent) => void;
    noSelectOnFocus?: boolean;
    autoCompleteOn?: boolean;
    list?: string;
}
/**
 * A search input with an option to have a trigger delay or not.
 */
export declare const InputSearch: React.ForwardRefExoticComponent<IPropsInputSearch & React.RefAttributes<HTMLInputElement>>;
