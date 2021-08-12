import React, { LegacyRef, MutableRefObject } from 'react';
export declare const KEY_UP_ARROW = 38;
export declare const KEY_DOWN_ARROW = 40;
export declare const KEY_LEFT_ARROW = 37;
export declare const KEY_RIGHT_ARROW = 39;
export declare const KEY_SPACE = 32;
export declare const KEY_ENTER = 13;
export declare const KEY_TAB = 9;
export declare const KEY_BACKSPACE = 8;
export declare const KEY_ESCAPE = 27;
export declare const KEY_STRING_ENTER = "Enter";
export declare const KEY_STRING_DOWN_ARROW = "ArrowDown";
export declare const KEY_STRING_UP_ARROW = "ArrowUp";
export declare const KEY_STRING_LEFT_ARROW = "ArrowLeft";
export declare const KEY_STRING_RIGHT_ARROW = "ArrowRight";
export declare const KEY_STRING_TAB = "Tab";
export declare const KEY_STRING_BACKSPACE = "Backspace";
export declare const KEY_STRING_ESCAPE = "Escape";
export declare const ElementCustomValue: (e: React.ChangeEvent<any>) => any;
export declare type TClassNames = {
    [key: string]: boolean;
};
export declare const ClassNames: (classes: TClassNames) => string;
export declare const HasPathComponent: (search: string) => boolean;
export declare const GetPathComponentAfter: (search: string) => any | undefined;
export declare const GetPathThrough: (search: string) => any | undefined;
export declare const CaptureGPS: () => Promise<GeolocationPosition | null>;
export declare const DownloadBase64Data: (fileName: string, base64: string, type: string) => void;
export declare const CopyRefToClipboard: (ref: any, tryFormatted?: boolean) => boolean;
export declare const TableIDToExcel: (tableID: string, fileName?: string | undefined, appendDateTime?: boolean) => void;
export declare type TBootStrapSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export declare type TBootStrapExtendedSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
export declare const SizeAtMin: (size: TBootStrapExtendedSizes) => number;
export declare const SizeAtMax: (size: TBootStrapExtendedSizes) => number;
export declare const useCombinedRefs: <T>(...refs: React.LegacyRef<T>[]) => React.MutableRefObject<T | undefined> | null;
