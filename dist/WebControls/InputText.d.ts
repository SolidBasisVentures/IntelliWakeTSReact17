import React, { Ref } from 'react';
import { IIWInputProps } from './IWInputProps';
interface IProps<T = any, V = any, H = HTMLInputElement> extends IIWInputProps<T, V, H> {
}
export declare const InputText: <T, V, H>(props: IProps<T, V, H> & {
    innerRef?: React.Ref<HTMLInputElement> | undefined;
}) => JSX.Element;
export {};
