import { IInputSwitchProps } from './InputSwitch';
export interface IInputCheckboxProps<T> extends IInputSwitchProps<T> {
    onChange?: (e: any) => void;
    onClick?: (e: any) => void;
}
export declare function InputCheckBox<T>(props: IInputCheckboxProps<T>): JSX.Element;
