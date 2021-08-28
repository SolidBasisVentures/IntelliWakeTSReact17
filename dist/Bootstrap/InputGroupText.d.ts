import React from 'react';
export interface IWInputGroupTextProps extends Omit<React.HTMLProps<HTMLSpanElement>, 'ref'> {
    tag?: string | React.ReactType;
}
export declare const InputGroupText: (props: IWInputGroupTextProps) => JSX.Element;
