import React, { ReactNode } from 'react';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { TStorageType } from '../Hooks/useStorage';
export interface IIWTab {
    faProps?: FontAwesomeIconProps;
    title: string;
    hide?: boolean;
    disabled?: boolean;
    pane: ReactNode;
    fillHeight?: boolean | 'noScroll';
    loadedOnlyWhenActive?: boolean;
    ariaLabelTab?: string;
    ariaLabelPane?: string;
}
export declare type TPaneLoading = 'All' | 'OnlyActive' | 'KeepOnceLoaded';
export interface IWTabProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
    tabs: IIWTab[];
    paneLoading?: TPaneLoading;
    rememberKey?: string;
    rememberType?: TStorageType;
    openTab?: string;
    setOpenTab?: (tab: string) => void;
    openTabChanged?: (tab: string) => void;
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
export declare const Tab: (props: IWTabProps) => JSX.Element | null;
