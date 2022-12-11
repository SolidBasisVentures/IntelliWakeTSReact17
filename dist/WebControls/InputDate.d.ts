import { IIWInputProps } from './IWInputProps';
interface IProps extends IIWInputProps<Record<string, any>, string | null> {
    showTime?: boolean;
    validIfYearGreaterThan?: number;
}
export declare function InputDate(props: IProps): JSX.Element;
export {};
