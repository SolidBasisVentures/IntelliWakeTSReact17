import { ReactNode } from 'react';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
export interface IDDAction {
    hidden?: boolean;
    divider?: boolean;
    disabled?: boolean;
    header?: boolean;
    faProps?: FontAwesomeIconProps;
    faPropHidden?: boolean;
    title?: ReactNode;
    action?: () => void;
    color?: string;
    className?: string;
}
export interface IPropsDDActions {
    ddActions: IDDAction[] | (() => IDDAction[]);
    hidden?: boolean;
    noCaret?: boolean;
    buttonText?: ReactNode;
    faProps?: FontAwesomeIconProps | null;
    className?: string;
    color?: string;
    right?: boolean;
    size?: 'sm' | 'lg';
}
/**
 * An array-driven drop down control
 */
export declare const DDActions: (props: IPropsDDActions) => JSX.Element | null;
