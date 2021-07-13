import { IIWInputProps } from './IWInputProps';
interface IProps<T, V, H = HTMLTextAreaElement> extends IIWInputProps<T, V, H> {
    bordered?: boolean;
    rows?: number;
}
export declare function InputTextArea<T, V, H = HTMLTextAreaElement>(props: IProps<T, V, H>): JSX.Element;
export {};
