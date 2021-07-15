import { TChangeValueFunction } from './IWInputProps';
export interface IInputSwitchProps<T = unknown> {
    name?: (T extends object ? keyof T : string) | undefined;
    checked: boolean;
    label: any;
    className?: string;
    plainText?: boolean;
    plainTextProps?: boolean;
    plainTextLabelOnly?: boolean;
    changeValue?: TChangeValueFunction<T>;
    hidden?: boolean;
    onColor?: string;
    offColor?: string;
    checkedIcon?: JSX.Element | boolean;
    uncheckedIcon?: JSX.Element | boolean;
    height?: number;
    width?: number;
    size?: 'sm' | 'lg';
    noPadding?: boolean;
    noFormControlPlainText?: boolean;
}
export declare function InputSwitch<T>(props: IInputSwitchProps<T>): JSX.Element;
