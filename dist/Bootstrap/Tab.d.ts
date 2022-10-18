import React, { ReactNode } from 'react';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { TStorageType } from '../Hooks/useStorage';
export interface IIWTab<T extends string = string> {
    faProps?: FontAwesomeIconProps;
    title: T;
    hide?: boolean;
    disabled?: boolean;
    pane: ReactNode;
    fillHeight?: boolean | 'noScroll';
    loadedOnlyWhenActive?: boolean;
    ariaLabelTab?: string;
    ariaLabelPane?: string;
}
export declare type TPaneLoading = 'All' | 'OnlyActive' | 'KeepOnceLoaded';
export interface IWTabProps<T extends string = string> extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
    tabs: IIWTab<T>[];
    paneLoading?: TPaneLoading;
    rememberKey?: string;
    rememberType?: TStorageType;
    openTab?: T;
    setOpenTab?: (tab: T) => void;
    openTabChanged?: (tab: T) => void;
    isDirty?: boolean;
    tabType?: 'tabs' | 'pills';
    fillHeight?: boolean | 'noScroll';
    classNamePanes?: string;
    classNamePaneActive?: string;
    noPanePadding?: boolean;
    noPaneBorder?: boolean;
    navClassName?: string;
    navItemClassName?: string;
    navItemSpanClassName?: string;
    padTabs?: boolean;
}
export declare const Tab: <T extends string = string>(props: IWTabProps<T>) => JSX.Element | null;
