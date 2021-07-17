import { IIWInputProps } from './IWInputProps';
interface IProps<T = any, V = string, H = HTMLTextAreaElement> extends IIWInputProps<T, V, H> {
    bordered?: boolean;
    rows?: number;
}
export declare function InputTextArea<T = any, V = string, H = HTMLTextAreaElement>(props: IProps<T, V, H>): JSX.Element;
export {};
