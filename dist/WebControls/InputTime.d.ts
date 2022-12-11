import { IIWInputProps } from './IWInputProps';
interface IProps<T, N> extends IIWInputProps<T, N> {
    includeDate?: boolean;
    editSeconds?: boolean;
}
export declare function InputTime<T, N extends string | (string | null)>(props: IProps<T, N>): JSX.Element;
export {};
