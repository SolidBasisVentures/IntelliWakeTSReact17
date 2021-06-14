import { ReactNode } from 'react';
import { TChangeValueFunction } from './IWInputProps';
export interface IOption {
    key: any;
    description: ReactNode;
}
export declare const OptionsActive: {
    key: boolean;
    description: string;
}[];
export declare const OptionsActiveAll: ({
    key: boolean;
    description: string;
} | {
    key: null;
    description: string;
})[];
interface IProps<T = unknown> {
    className?: string;
    borderless?: boolean;
    inline?: boolean;
    color?: string;
    options: IOption[];
    value: any;
    name?: T extends object ? keyof T : string;
    changeValue?: TChangeValueFunction<T>;
    plainText?: boolean;
}
/**
 * A input select that lets you update a state when selecting an option.
 */
export declare const InputSelectStep: (props: IProps) => JSX.Element;
export {};
