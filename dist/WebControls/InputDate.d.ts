import { IIWInputProps } from './IWInputProps';
interface IProps<T, N> extends IIWInputProps<T, N> {
    showTime?: boolean;
    validIfYearGreaterThan?: number;
}
export declare function InputDate<T, N extends (string | (string | null))>(props: IProps<T, N>): JSX.Element;
export {};
