import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { TClassNames } from '../Functions';
export declare type TChangeValueFunction<T = any, V = any> = (value: V, name?: (T extends object ? keyof T : string) | undefined, shiftKey?: boolean, ctrlKey?: boolean, altKey?: boolean) => void;
export interface IIWInputAddProps<T = any, V = any> {
    plainText?: boolean;
    plainTextURL?: string;
    plainTextProps?: any;
    plainOnClick?: () => void;
    replaceEmpty?: ReactNode | boolean;
    changeValue?: TChangeValueFunction<T, V>;
    changeValueLate?: TChangeValueFunction<T, V>;
    setChanges?: Dispatch<SetStateAction<T>>;
    setChangesLate?: Dispatch<SetStateAction<T>>;
    autoCompleteOn?: boolean;
    autoComplete?: string;
    prepend?: ReactNode;
    append?: ReactNode;
    invalid?: boolean;
    consoleVerbose?: boolean;
}
export declare type THTMLChangeElements = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
export declare type TLegacyInputType = 'text' | 'email' | 'select' | 'file' | 'radio' | 'checkbox' | 'textarea' | 'button' | 'reset' | 'submit' | 'date' | 'datetime-local' | 'hidden' | 'image' | 'month' | 'number' | 'range' | 'search' | 'tel' | 'url' | 'week' | 'password' | 'datetime' | 'time' | 'color';
export interface ILegacyInputProps<T = THTMLChangeElements> extends React.InputHTMLAttributes<T> {
    type?: TLegacyInputType;
    invalid?: boolean;
    plaintext?: boolean;
}
export interface IIWInputProps<T = any, V = any, H = THTMLChangeElements> extends Omit<ILegacyInputProps<H>, 'value' | 'name'>, IIWInputAddProps<T, V> {
    name?: T extends object ? keyof T : string;
    value?: V;
}
export declare const ReduceInputProps: <T = any, V = any, H = THTMLChangeElements>(props: any, classNameAdd?: string | TClassNames | string[] | undefined) => ILegacyInputProps;
export declare const ReduceToInputAddProps: <T = any, V = any>(props: any) => IIWInputAddProps<T, V>;
export declare const HandleChangeValue: <T = any, V = any, H = any>(e: React.ChangeEvent<H>, changeValue?: TChangeValueFunction<T, V> | undefined, onChange?: ((e: React.ChangeEvent<H>) => void) | undefined, setChanges?: React.Dispatch<React.SetStateAction<T>> | undefined) => void;
