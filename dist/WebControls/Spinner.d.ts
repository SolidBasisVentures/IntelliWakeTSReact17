import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
export interface IIWSpinnerProps extends Partial<FontAwesomeIconProps> {
    invisible?: boolean;
}
export declare const Spinner: (props: IIWSpinnerProps) => JSX.Element;
