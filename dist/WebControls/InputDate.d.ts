import { IIWInputProps } from './IWInputProps';
interface IProps<T> extends IIWInputProps<T, string | null> {
    showTime?: boolean;
    validIfYearGreaterThan?: number;
}
export declare function InputDate<T>(props: IProps<T>): JSX.Element;
export {};
