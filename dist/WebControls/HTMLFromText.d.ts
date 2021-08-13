import React from 'react';
interface IProps extends React.HTMLProps<HTMLSpanElement> {
    text: string | null | undefined;
}
export declare const HTMLFromText: (props: IProps) => JSX.Element | null;
export {};
