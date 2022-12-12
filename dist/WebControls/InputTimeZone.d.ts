import { IIWInputProps } from './IWInputProps';
import { TDateAny } from '@solidbasisventures/intelliwaketsfoundation';
export interface IInputTimeZoneProps<T> extends IIWInputProps<T> {
    relativeDate?: TDateAny;
}
export declare function InputTimeZone<T>(props: IInputTimeZoneProps<T>): JSX.Element;
