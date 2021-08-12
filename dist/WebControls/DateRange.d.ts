import { Dayjs } from 'dayjs';
export declare const customRangeName = "Custom Range";
export interface IDateRangeString {
    name: string;
    start: string;
    end: string;
}
export declare const CreateCustomDateRange: (dateStart: Dayjs | string, dateEnd: Dayjs | string) => IDateRangeString;
export declare const DateRangeDateDayjsToString: (date: Dayjs | string) => string;
export declare const DateRangeDateStringToDayjs: (date: Dayjs | string) => Dayjs;
export declare const DateRangeToDayjs: (dateRange: IDateRange | IDateRangeString) => IDateRange;
export declare const DateRangeToString: (dateRange: IDateRange | IDateRangeString) => IDateRangeString;
export interface IDateRange {
    name: string;
    start: Dayjs;
    end: Dayjs;
}
export declare const initialDateRange: IDateRange;
export declare const initialDateRangeString: IDateRangeString;
interface IPropsCalendar {
    month: Dayjs;
    startSelected: Dayjs;
    endSelected: Dayjs;
    dateClick: ((date: Dayjs) => void);
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
export declare const defaultRanges: IDateRange[];
export declare const defaultRangeStrings: IDateRangeString[];
export declare const defaultRangesReport: IDateRange[];
export declare const defaultRangeStringsReport: IDateRangeString[];
export declare const defaultRangesReportQuarterly: IDateRange[];
export declare const defaultRangeStringsReportQuarterly: IDateRangeString[];
/**
 * Default to this month
 *
 * Use DateRangeToString(defaultRange) to get a string of it
 */
export declare const defaultRange: IDateRange;
/**
 * Default to this week
 *
 * Use DateRangeToString(defaultRangeWeek) to get a string of it
 */
export declare const defaultRangeWeek: IDateRange;
/**
 * Default to last 4 weeks
 *
 * Use DateRangeToString(defaultRangeLast4Weeks) to get a string of it
 */
export declare const defaultRangeLast4Weeks: IDateRange;
/**
 * Default to this year
 *
 * Use DateRangeToString(defaultRangeYear) to get a string of it
 */
export declare const defaultRangeYear: IDateRange;
export declare const defaultRangeString: IDateRangeString;
export {};
