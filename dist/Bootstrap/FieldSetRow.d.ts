import { ReactElement, ReactNode } from 'react';
export declare enum EFieldRowInputWidth {
    Medium = 0,
    Short = 1
}
interface IProps {
    label?: ReactNode;
    labelClassName?: string;
    hidden?: boolean;
    className?: string;
    input: ReactElement | string | number | null | undefined;
    inputFeedback?: ReactNode;
    inputWidth?: EFieldRowInputWidth;
    inputSecond?: ReactNode;
    inputSecondFeedback?: ReactNode;
    inputThird?: ReactNode;
    inputThirdFeedback?: ReactNode;
}
export declare const FieldSetRow: (props: IProps) => JSX.Element;
export {};
