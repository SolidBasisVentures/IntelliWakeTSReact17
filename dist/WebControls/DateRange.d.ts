export declare const customRangeName = "Custom Range";
export interface IDateRangeString {
    name: string;
    start: string;
    end: string;
}
export declare const CreateCustomDateRange: (dateStart: string, dateEnd: string) => IDateRangeString;
export declare const InitialDateRangeString: () => IDateRangeString;
interface IPropsCalendar {
    month: string;
    startSelected: string;
    endSelected: string;
    dateClick: ((date: string) => void);
    prevMonth?: Function;
    nextMonth?: Function;
}
export declare const DateRangeCalendar: (props: IPropsCalendar) => JSX.Element;
export interface IPropsDateRange {
    selectRangeString?: ((range: IDateRangeString) => void);
    presetRanges?: IDateRangeString[];
    defaultRange?: IDateRangeString;
    showCaret?: boolean;
    faIcon?: any | undefined | null;
    borderless?: boolean;
    color?: string;
    className?: string;
    rightAlign?: boolean;
}
export declare const DateRange: (props: IPropsDateRange) => JSX.Element;
export declare const DefaultRangeStrings: () => IDateRangeString[];
export declare const DefaultRangeStringsReport: () => IDateRangeString[];
export declare const DefaultRangeStringsReportQuarterly: () => IDateRangeString[];
/**
 * Default to this month
 *
 * Use DateRangeToString(defaultRange) to get a string of it
 */
export declare const DefaultRangeString: () => IDateRangeString;
/**
 * Default to last month
 *
 * Use DateRangeToString(defaultRange) to get a string of it
 */
export declare const DefaultRangeLastMonth: () => IDateRangeString;
/**
 * Default to this week
 *
 * Use DateRangeToString(defaultRangeWeek) to get a string of it
 */
export declare const DefaultRangeWeek: () => IDateRangeString;
/**
 * Default to last 4 weeks
 *
 * Use DateRangeToString(defaultRangeLast4Weeks) to get a string of it
 */
export declare const DefaultRangeLast4Weeks: () => IDateRangeString;
/**
 * Default to this year
 *
 * Use DateRangeToString(defaultRangeYear) to get a string of it
 */
export declare const DefaultRangeYear: () => IDateRangeString;
export {};
