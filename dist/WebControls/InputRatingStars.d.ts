import { SizeProp } from '@fortawesome/fontawesome-svg-core';
export interface IIWRatingStarsProps<T> {
    value: number | null;
    name?: keyof T;
    plainText?: boolean;
    changeValue?: (value: any, name?: keyof T) => void;
    size?: SizeProp;
    allowNull?: boolean;
}
export declare const InputRatingStars: <T>(props: IIWRatingStarsProps<T>) => JSX.Element;
