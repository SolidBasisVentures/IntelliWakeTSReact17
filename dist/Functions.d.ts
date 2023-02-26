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
export type TKeyboardKey = 'Enter' | 'ArrowDown' | 'ArrowUp' | 'ArrowLeft' | 'ArrowRight' | 'Tab' | 'Backspace' | 'Escape';
export declare const KEY_STRING_ENTER = "Enter";
export declare const KEY_STRING_DOWN_ARROW = "ArrowDown";
export declare const KEY_STRING_UP_ARROW = "ArrowUp";
export declare const KEY_STRING_LEFT_ARROW = "ArrowLeft";
export declare const KEY_STRING_RIGHT_ARROW = "ArrowRight";
export declare const KEY_STRING_TAB = "Tab";
export declare const KEY_STRING_BACKSPACE = "Backspace";
export declare const KEY_STRING_ESCAPE = "Escape";
export declare const ElementCustomValue: (e: React.ChangeEvent<any>) => any;
export type TClassNames = {
    [key: string]: boolean;
};
export declare const ClassNames: (classes: TClassNames, fixedClasses?: string) => string;
export declare const HasPathComponent: (search: string) => boolean;
/**
 * Gets both "active" (before the ~) and "inactive" components of the current path name as string arrays
 *
 * @constructor
 */
export declare const GetPathComponentsActiveInactive: () => {
    active: string[];
    inactive: string[];
};
/**
 * Gets "active" components (before the ~) of the current path name as a string array
 *
 * @constructor
 */
export declare const GetPathComponentsActive: () => string[];
/**
 * Searches the last component of the active (before the tilde) path (or multiple components if includeReverseIndexes > 1) to see if a lower case match of the search is included
 *
 * @param search
 * @param includeReverseIndexes
 * @constructor
 */
export declare const ActivePathComponentEndsWith: (search: string | undefined | null, includeReverseIndexes?: number) => boolean;
export declare const GetPathComponentAfter: (search: string | undefined | null) => string | undefined;
export declare const GetPathComponentAt: (search: string | undefined | null, toEnd?: boolean) => string | undefined;
export declare const GetPathThrough: (search: string | undefined | null) => string | undefined;
export declare const CaptureGPS: () => Promise<GeolocationPosition | null>;
export declare const DownloadBase64Data: (fileName: string, base64: string) => void;
export declare const CopyRefToClipboard: (ref: any, tryFormatted?: boolean) => boolean;
export declare const TableIDToExcel: (tableID: string, fileName?: string, appendDateTime?: boolean) => void;
export type TBootStrapSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TBootStrapExtendedSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
export declare const SizeAtMin: (size: TBootStrapExtendedSizes) => number;
export declare const SizeAtMax: (size: TBootStrapExtendedSizes) => number;
export declare const useCombinedRefs: <T>(...refs: React.LegacyRef<T>[]) => React.MutableRefObject<T | undefined> | null;
