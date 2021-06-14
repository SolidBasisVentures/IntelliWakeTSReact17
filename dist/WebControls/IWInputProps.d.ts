import { FormControlProps } from 'react-bootstrap';
import React, { ReactNode } from 'react';
export declare type TChangeValueFunction<T = any, V = any> = (value: V, name?: T extends object ? keyof T : string, shiftKey?: boolean, ctrlKey?: boolean, altKey?: boolean) => void;
export interface IIWInputAddProps<T = any, V = any> {
    plainText?: boolean;
    plainTextURL?: string;
    plainTextProps?: any;
    plainOnClick?: () => void;
    changeValue?: TChangeValueFunction<T, V>;
    changeValueLate?: TChangeValueFunction<T, V>;
    autoCompleteOn?: boolean;
    prepend?: ReactNode;
    append?: ReactNode;
}
export interface IIWInputProps<T = any, V = any> extends Omit<FormControlProps, 'value'>, IIWInputAddProps<T, V> {
    value?: V;
    style?: any;
    name?: string;
    isInvalid?: boolean;
    required?: boolean;
    onFocus?: (e: React.FocusEvent) => void;
    inputIsValid?: any;
    onBlur?: (e: React.FocusEvent) => void;
    valueOnInvalid?: any;
    placeholder?: string;
    onKeyDown?: (e: React.KeyboardEvent) => void;
    autoComplete?: string;
    autoFocus?: boolean;
}
export declare const ReduceInputProps: <T = any, V = any>(props: any) => any;
export declare const ReduceToInputAddProps: <T = any, V = any>(props: any) => IIWInputAddProps<T, V>;
export declare const HandleChangeValue: <T = any, V = any>(e: React.ChangeEvent<HTMLInputElement>, changeValue?: TChangeValueFunction<T, V> | undefined, onChange?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined) => void;
