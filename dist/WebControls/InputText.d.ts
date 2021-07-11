import React from 'react';
import { IIWInputProps } from './IWInputProps';
interface IProps<T = any, V = any, H = HTMLInputElement> extends IIWInputProps<T, V, H> {
}
export declare const InputText: React.ForwardRefExoticComponent<IProps<any, any, HTMLInputElement> & React.RefAttributes<HTMLInputElement>>;
export {};
