import { ReactElement, ReactNode } from 'react';
import { IIWInputAddProps, IIWInputProps, THTMLChangeElements } from './IWInputProps';
interface IProps<T = any, V = any, H = THTMLChangeElements> extends IIWInputAddProps<T, V> {
    children: ReactElement<IIWInputProps<T, V, H>>;
    className?: string;
    inputIsValid?: (value: any) => boolean;
    valueOnInvalid?: (value: any) => any;
    transformToValid?: (value: any, e: any) => any;
    doNotSelectOnFocus?: boolean;
    plainTextControl?: ReactNode;
    invalid?: boolean;
    lateDelayMS?: number;
    isEqual?: (internalValue: any, endValue: any) => boolean;
    internalStateValue?: (value: any, e: any) => any;
}
export declare const InputWrapper: <T, V, H = THTMLChangeElements>(props: IProps<T, V, H>) => JSX.Element;
export {};
