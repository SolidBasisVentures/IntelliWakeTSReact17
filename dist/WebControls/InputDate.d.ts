import { IIWInputProps } from './IWInputProps';
interface IProps<T = unknown> extends IIWInputProps<T> {
    showTime?: boolean;
    validIfYearGreaterThan?: number;
}
export declare function InputDate<T>(props: IProps<T>): JSX.Element;
export {};
