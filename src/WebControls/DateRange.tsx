import React, {useEffect, useRef, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCalendarAlt} from '@fortawesome/pro-regular-svg-icons'
import {ClassNames} from '../Functions'
import {
	DateCompare,
	DateDayOfWeek,
	DateFormatAny,
	DateIsWeekend,
	DateOnly,
	DateWeekISONumber
} from '@solidbasisventures/intelliwaketsfoundation'

export const customRangeName = 'Custom Range'

export interface IDateRangeString {
	name: string,
	start: string,
	end: string
}

export const CreateCustomDateRange = (dateStart: string, dateEnd: string): IDateRangeString => {
	return {
		name: customRangeName,
		start: dateStart,
		end: dateEnd
	}
}

export const InitialDateRangeString = (): IDateRangeString => ({
	name: customRangeName,
	start: DateOnly('now'),
	end: DateOnly('now')
})

interface IPropsCalendar {
	month: string,
	startSelected: string,
	endSelected: string,
	dateClick: ((date: string) => void),
	prevMonth?: Function,
	nextMonth?: Function
}

export const DateRangeCalendar = (props: IPropsCalendar) => {
	let dates: (string[])[] = []

	let firstDay = DateOnly(props.month, {month: 'StartOf'})
	let currentDay = DateOnly(firstDay, {week: 'StartOf'})
	let lastDay = DateOnly(props.month, {month: 'EndOf'})

	while (DateCompare(currentDay, 'IsSameOrBefore', lastDay, 'day')) {
		let week: string[] = []

		do {
			week.push(currentDay)
			currentDay = DateOnly(currentDay, {day: 1})
		} while ((DateDayOfWeek(currentDay) ?? 0) > 0)

		dates.push(week)
	}

	const prev = () => {
		if (props.prevMonth) {
			props.prevMonth()
		}
	}

	const next = () => {
		if (props.nextMonth) {
			props.nextMonth()
		}
	}

	return (
		<table>
			<thead>
			<tr>
				{props.prevMonth !== undefined
					?
					<th className='prev available' onClick={prev}><span> </span></th>
					:
					<th />
				}
				<th colSpan={5} className='month'>{DateFormatAny('MMM YYYY', firstDay)}</th>
				{props.nextMonth !== undefined
					?
					<th className='next available' onClick={next}><span> </span></th>
					:
					<th />
				}
			</tr>
			<tr>
				<th>Su</th>
				<th>Mo</th>
				<th>Tu</th>
				<th>We</th>
				<th>Th</th>
				<th>Fr</th>
				<th>Sa</th>
			</tr>
			</thead>
			<tbody>
			{dates.map((week, idx: number) =>
				<tr key={idx}>
					{week.map((day) =>
						<td className={
							ClassNames({
								weekend: DateIsWeekend(day),
								'off ends': (DateCompare(day, 'IsBefore', firstDay, 'day')
										|| DateCompare(day, 'IsAfter', lastDay, 'day'))
									&& !(DateCompare(day, 'IsSameOrAfter', props.startSelected, 'day')
										&& DateCompare(day, 'IsSameOrBefore', props.endSelected, 'day')),
								'active start-date': DateCompare(day, 'IsSame', props.startSelected, 'day'),
								'in-range': DateCompare(day, 'IsAfter', props.startSelected, 'day')
									&& DateCompare(day, 'IsBefore', props.endSelected, 'day'),
								'active end-date': DateCompare(day, 'IsSame', props.endSelected, 'day')
							}, 'available')
						} key={day} onClick={() => props.dateClick(day)}>
							{DateFormatAny('D', day)}
						</td>
					)}
				</tr>
			)}
			</tbody>
		</table>
	)
}

export interface IPropsDateRange {
	selectRangeString?: ((range: IDateRangeString) => void),
	presetRanges?: IDateRangeString[],
	defaultRange?: IDateRangeString,
	showCaret?: boolean,
	faIcon?: any | undefined | null,
	borderless?: boolean,
	color?: string,
	className?: string,
	rightAlign?: boolean
}

export const DateRange = (props: IPropsDateRange) => {
	const nodeParent: any = useRef()
	const nodeBody: any = useRef()

	const getStartRange = (): IDateRangeString => {
		if (props.defaultRange && props.defaultRange.name) {
			if (props.defaultRange.name === customRangeName) {
				return props.defaultRange
			}

			if (!!props.presetRanges) {
				const presetRanges = props.presetRanges

				if (presetRanges.length > 0) {
					const foundItem = presetRanges.find((item: IDateRangeString) => props.defaultRange!.name === item.name)
					if (foundItem) {
						return foundItem
					}

					const foundItemStartsWith = presetRanges.find((item) => item.name.startsWith(props.defaultRange!.name))
					if (foundItemStartsWith) {
						return foundItemStartsWith
					}
				}
			}
		}

		if (props.presetRanges && props.presetRanges.length > 0) return props.presetRanges[0]

		return InitialDateRangeString()
	}

	const [state, setState] = useState({
		isOpen: false,
		selectedRange: getStartRange(),
		selectedText: '',
		prevPreset: null as IDateRangeString | null,
		customRange: InitialDateRangeString(),
		monthToShow: getStartRange().start,
		applyToFirst: true
	})

	const getCurrentRange = (): IDateRangeString => {
		if (state.selectedRange) return state.selectedRange

		return getStartRange()
	}

	const currentRange = getCurrentRange()

	const rangeDescription = (range: IDateRangeString): string => {
		return (range.name === customRangeName ? (DateOnly(range.start, {formatLocale: true}) + ' - ' + DateOnly(range.end, {formatLocale: true})) : range.name)
	}

	const setOpen = (e: any) => {
		if (!nodeBody.current.contains(e.target)) {
			setState({...state, isOpen: true})
		}
	}

	const handleClick = (e: any) => {
		if (!nodeParent.current.contains(e.target)) {
			setState({...state, isOpen: false})
		}
	}

	const handlePresetClick = (range: IDateRangeString) => {
		setState(prevState => ({...prevState, isOpen: false, selectedRange: range}))

		if (!!props.selectRangeString) props.selectRangeString({...range})
	}

	const handleCustomApplyClick = () => {
		setState(prevState => ({...prevState, isOpen: false, selectedRange: state.customRange}))

		if (!!props.selectRangeString) props.selectRangeString({...state.customRange})
	}

	const handleCustomClick = () => {
		const customRange = {...getCurrentRange(), name: customRangeName}

		setState(prevState => ({...prevState, prevPreset: currentRange, customRange: customRange}))
	}

	const handleUnCustomClick = () => {
		const customRange = {...getCurrentRange(), name: customRangeName}

		setState(prevState => ({...prevState, prevPreset: null, customRange: customRange}))
	}

	const handleDateClick = (day: string) => {
		let newState = {...state}

		if (newState.applyToFirst) {
			newState.customRange.start = day
		} else {
			newState.customRange.end = day
		}

		if (DateCompare(newState.customRange.start, 'IsAfter', newState.customRange.end, 'day')) {
			[newState.customRange.start, newState.customRange.end] = [newState.customRange.end, newState.customRange.start]
		}

		newState.applyToFirst = !newState.applyToFirst

		setState(newState)
	}

	const prevMonth = () => setState(prevState => ({
		...prevState,
		monthToShow: DateOnly(state.monthToShow, {month: -1})
	}))

	const nextMonth = () => setState(prevState => ({
		...prevState,
		monthToShow: DateOnly(state.monthToShow, {month: 1})
	}))

	useEffect(() => {
		document.addEventListener('mousedown', handleClick)
		return () => {
			document.removeEventListener('mousedown', handleClick)
		}
	})

	useEffect(() => {
		if (!!props.defaultRange) {
			setState(prevState => ({...prevState, selectedRange: props.defaultRange!}))
		}
	}, [props.defaultRange])

	return (
		<div
			className={'DateRangeDD ' + (props.className ?? '') + (props.borderless ? '' : ' border') + (props.showCaret ? ' dropdown-toggle' : '')}
			onClick={setOpen} ref={nodeParent} color={props.color}>
			{props.faIcon !== null &&
				<FontAwesomeIcon icon={props.faIcon ? props.faIcon : faCalendarAlt} fixedWidth />
			} {rangeDescription(state.selectedRange!)}
			<div className={ClassNames({DateRangeLB: true, OpensRight: !props.rightAlign, 'd-none': !state.isOpen})}
			     ref={nodeBody}>
				<div className={'ranges' + (state.prevPreset ? ' d-none' : '')}>
					<ul>
						{props.presetRanges!.map((preset: IDateRangeString, idx: number) =>
							<li key={idx} onClick={() => handlePresetClick(preset)}
							    className={(preset.name === currentRange.name ? 'active' : '')}>
								{preset.name}
							</li>
						)}
						<li onClick={handleCustomClick}>
							{customRangeName}
							<span className='float-end'>&gt;</span>
						</li>
					</ul>
				</div>
				<div className={'drp-headers' + (!state.prevPreset ? ' d-none' : '')} onClick={handleUnCustomClick}>
                    <span>
                        &lt; Presets
                    </span>
				</div>
				<div className={'drp-calendar left' + (!state.prevPreset ? ' d-none' : '')}>
					<div className='calendar-table'>

						<DateRangeCalendar month={state.monthToShow} startSelected={state.customRange.start}
						                   endSelected={state.customRange.end} prevMonth={prevMonth}
						                   nextMonth={nextMonth} dateClick={handleDateClick} />
					</div>
				</div>
				<div className={'drp-buttons' + (!state.prevPreset ? ' d-none' : '')}>
					<span className='drp-selected'>{rangeDescription(state.customRange)}</span>
					<button className='btn btn-sm btn-primary' type='button'
					        onClick={handleCustomApplyClick}>Apply
					</button>
				</div>
			</div>
		</div>
	)
}

export const DefaultRangeStrings = (): IDateRangeString[] => [
	{
		name: `This Week #${DateWeekISONumber('now')?.week ?? 0}`,
		start: DateOnly('now', {week: 'StartOf'}),
		end: DateOnly('now', {week: 'EndOf'})
	},
	{
		name: `Last Week #${DateWeekISONumber('now', {week: -1})?.week ?? 0}`,
		start: DateOnly('now', {weeks: -1, week: 'StartOf'}),
		end: DateOnly('now', {weeks: -1, week: 'EndOf'})
	},
	{
		name: 'Previous 4 Weeks',
		start: DateOnly('now', {weeks: -4, week: 'StartOf'}),
		end: DateOnly('now', {weeks: -1, week: 'EndOf'})
	},
	{
		name: 'This Month',
		start: DateOnly('now', {month: 'StartOf'}),
		end: DateOnly('now', {month: 'EndOf'})
	},
	{
		name: 'Last Month',
		start: DateOnly('now', {months: -1, month: 'StartOf'}),
		end: DateOnly('now', {months: -1, month: 'EndOf'})
	},
	{
		name: 'Last 7 Days',
		start: DateOnly('now', {days: -6}),
		end: DateOnly('now')
	},
	{
		name: 'Last 30 Days',
		start: DateOnly('now', {days: -30}),
		end: DateOnly('now')
	}
]

export const DefaultRangeStringsReport = (): IDateRangeString[] => [
	{
		name: 'This Week',
		start: DateOnly('now', {week: 'StartOf'}),
		end: DateOnly('now', {week: 'EndOf'})
	},
	{
		name: 'Last Week',
		start: DateOnly('now', {weeks: -1, week: 'StartOf'}),
		end: DateOnly('now', {weeks: -1, week: 'EndOf'})
	},
	{
		name: 'This Month',
		start: DateOnly('now', {month: 'StartOf'}),
		end: DateOnly('now', {month: 'EndOf'})
	},
	{
		name: 'Last Month',
		start: DateOnly('now', {months: -1, month: 'StartOf'}),
		end: DateOnly('now', {months: -1, month: 'EndOf'})
	},
	{
		name: 'Year-to-Date',
		start: DateOnly('now', {year: 'StartOf'}),
		end: DateOnly('now', {year: 'EndOf'})
	},
	{
		name: 'Last Year',
		start: DateOnly('now', {years: -1, year: 'StartOf'}),
		end: DateOnly('now', {years: -1, year: 'EndOf'})
	}
]

export const DefaultRangeStringsReportQuarterly = (): IDateRangeString[] => [
	{
		name: 'This Month',
		start: DateOnly('now', {month: 'StartOf'}),
		end: DateOnly('now', {month: 'EndOf'})
	},
	{
		name: 'Last Month',
		start: DateOnly('now', {months: -1, month: 'StartOf'}),
		end: DateOnly('now', {months: -1, month: 'EndOf'})
	},
	{
		name: 'This Quarter',
		start: DateOnly('now', {quarter: 'StartOf'}),
		end: DateOnly('now', {quarter: 'EndOf'})
	},
	{
		name: 'Last Quarter',
		start: DateOnly('now', {quarters: -1, quarter: 'StartOf'}),
		end: DateOnly('now', {quarters: -1, quarter: 'EndOf'})
	},
	{
		name: '2 Quarters ago',
		start: DateOnly('now', {quarters: -2, quarter: 'StartOf'}),
		end: DateOnly('now', {quarters: -2, quarter: 'EndOf'})
	},
	{
		name: '3 Quarters ago',
		start: DateOnly('now', {quarters: -3, quarter: 'StartOf'}),
		end: DateOnly('now', {quarters: -3, quarter: 'EndOf'})
	},
	{
		name: '4 Quarters ago',
		start: DateOnly('now', {quarters: -4, quarter: 'StartOf'}),
		end: DateOnly('now', {quarters: -4, quarter: 'EndOf'})
	},
	{
		name: 'Year to Date',
		start: DateOnly('now', {year: 'StartOf'}),
		end: DateOnly('now')
	},
	{
		name: 'This Year',
		start: DateOnly('now', {year: 'StartOf'}),
		end: DateOnly('now', {year: 'EndOf'})
	},
	{
		name: 'Last Year',
		start: DateOnly('now', {years: -1, year: 'StartOf'}),
		end: DateOnly('now', {years: -1, year: 'EndOf'})
	}
]

/**
 * Default to this month
 *
 * Use DateRangeToString(defaultRange) to get a string of it
 */
export const DefaultRangeString = (): IDateRangeString => ({
	name: 'This Month',
	start: DateOnly('now', {month: 'StartOf'}),
	end: DateOnly('now', {month: 'EndOf'})
})

/**
 * Default to last month
 *
 * Use DateRangeToString(defaultRange) to get a string of it
 */
export const DefaultRangeLastMonth = (): IDateRangeString => ({
	name: 'Last Month',
	start: DateOnly('now', {months: -1, month: 'StartOf'}),
	end: DateOnly('now', {months: -1, month: 'EndOf'})
})

/**
 * Default to this week
 *
 * Use DateRangeToString(defaultRangeWeek) to get a string of it
 */
export const DefaultRangeWeek = (): IDateRangeString => ({
	name: 'This Week',
	start: DateOnly('now', {week: 'StartOf'}),
	end: DateOnly('now', {week: 'EndOf'})
})

/**
 * Default to last 4 weeks
 *
 * Use DateRangeToString(defaultRangeLast4Weeks) to get a string of it
 */
export const DefaultRangeLast4Weeks = (): IDateRangeString => ({
	name: 'Last 4 Weeks',
	start: DateOnly('now', {weeks: -3, week: 'StartOf'}),
	end: DateOnly('now', {week: 'EndOf'})
})

/**
 * Default to last Quarter
 *
 * Use DateRangeToString(defaultRangeYear) to get a string of it
 */
export const DefaultRangeLastQuarter = (): IDateRangeString => ({
	name: 'Last Quarter',
	start: DateOnly('now', {quarters: -1, quarter: 'StartOf'}),
	end: DateOnly('now', {quarters: -1, quarter: 'EndOf'})
})

/**
 * Default to this Quarter
 *
 * Use DateRangeToString(defaultRangeYear) to get a string of it
 */
export const DefaultRangeThisQuarter = (): IDateRangeString => ({
	name: 'This Quarter',
	start: DateOnly('now', {quarter: 'StartOf'}),
	end: DateOnly('now', {quarter: 'EndOf'})
})

/**
 * Default to this year
 *
 * Use DateRangeToString(defaultRangeYear) to get a string of it
 */
export const DefaultRangeYear = (): IDateRangeString => ({
	name: 'Year-to-Date',
	start: DateOnly('now', {year: 'StartOf'}),
	end: DateOnly('now')
})
