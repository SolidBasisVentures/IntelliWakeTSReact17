import { Moment } from 'moment-timezone';
export declare const customRangeName = "Custom Range";
export interface IDateRangeString {
    name: string;
    start: string;
    end: string;
}
export declare const CreateCustomDateRange: (dateStart: Moment | string, dateEnd: Moment | string) => IDateRangeString;
export declare const DateRangeDateMomentToString: (date: Moment | string) => string;
export declare const DateRangeDateStringToMoment: (date: Moment | string) => Moment;
export declare const DateRangeToMoment: (dateRange: IDateRange | IDateRangeString) => IDateRange;
export declare const DateRangeToString: (dateRange: IDateRange | IDateRangeString) => IDateRangeString;
export interface IDateRange {
    name: string;
    start: Moment;
    end: Moment;
}
export declare const InitialDateRange: () => IDateRange;
export declare const InitialDateRangeString: IDateRangeString;
interface IPropsCalendar {
    month: Moment;
    startSelected: Moment;
    endSelected: Moment;
    dateClick: ((date: Moment) => void);
    prevMonth?: Function;
    nextMonth?: Function;
}
export declare const DateRangeCalendar: (props: IPropsCalendar) => JSX.Element;
export interface IPropsDateRange {
    selectRange?: ((range: IDateRange) => void);
    selectRangeString?: ((range: IDateRangeString) => void);
    presetRanges?: (IDateRange | IDateRangeString)[];
    defaultRange?: IDateRange | IDateRangeString;
    showCaret?: boolean;
    faIcon?: any | undefined | null;
    borderless?: boolean;
    color?: string;
    className?: string;
    rightAlign?: boolean;
}
export declare const DateRange: (props: IPropsDateRange) => JSX.Element;
export declare const DefaultRanges: () => IDateRange[];
export declare const DefaultRangeStrings: () => IDateRangeString[];
export declare const DefaultRangesReport: () => IDateRange[];
export declare const DefaultRangeStringsReport: () => IDateRangeString[];
export declare const DefaultRangesReportQuarterly: () => IDateRange[];
export declare const DefaultRangeStringsReportQuarterly: () => IDateRangeString[];
/**
 * Default to this month
 *
 * Use DateRangeToString(defaultRange) to get a string of it
 */
export declare const DefaultRange: () => IDateRange;
/**
 * Default to last month
 *
 * Use DateRangeToString(defaultRange) to get a string of it
 */
export declare const DefaultRangeLastMonth: () => IDateRange;
/**
 * Default to this week
 *
 * Use DateRangeToString(defaultRangeWeek) to get a string of it
 */
export declare const DefaultRangeWeek: () => IDateRange;
/**
 * Default to last 4 weeks
 *
 * Use DateRangeToString(defaultRangeLast4Weeks) to get a string of it
 */
export declare const DefaultRangeLast4Weeks: () => IDateRange;
/**
 * Default to this year
 *
 * Use DateRangeToString(defaultRangeYear) to get a string of it
 */
export declare const DefaultRangeYear: () => IDateRange;
export declare const DefaultRangeString: () => IDateRangeString;
export {};
