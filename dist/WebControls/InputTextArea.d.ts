import { Ref } from 'react';
import { IIWInputProps } from './IWInputProps';
interface IProps<T = any, V = string, H = HTMLTextAreaElement> extends IIWInputProps<T, V, H> {
    bordered?: boolean;
    rows?: number;
    plainTextScroll?: boolean;
}
export declare function InputTextArea<T = any, V = string, H = HTMLTextAreaElement>(props: IProps<T, V, H> & {
    innerRef?: Ref<HTMLTextAreaElement>;
}): JSX.Element;
export {};
