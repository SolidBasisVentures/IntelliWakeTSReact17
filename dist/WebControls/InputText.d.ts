import React, { Ref } from 'react';
import { IIWInputProps } from './IWInputProps';
interface IProps<T = any, V = any, H = HTMLInputElement> extends IIWInputProps<T, V, H> {
}
export declare const InputText: <T, V, H>(props: IProps<T, V, H> & {
    innerRef?: ((instance: HTMLInputElement | null) => void) | React.RefObject<HTMLInputElement> | null | undefined;
}) => JSX.Element;
export {};
