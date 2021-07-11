import React from 'react';
export interface IWButtonGroupProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
    vertical?: boolean;
}
export declare const ButtonGroup: (props: IWButtonGroupProps) => JSX.Element;
