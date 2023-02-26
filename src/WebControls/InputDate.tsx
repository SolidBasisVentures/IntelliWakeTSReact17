import React, {useEffect, useMemo, useRef, useState} from 'react'
import {IIWInputProps, ReduceInputProps} from './IWInputProps'
import {
	CleanNumber,
	DateFormat,
	DateISO,
	DateOnlyNull,
	OmitProperty,
	RandomString,
	TimeOnly
} from '@solidbasisventures/intelliwaketsfoundation'

interface IProps<T, N> extends IIWInputProps<T, N> {
	showTime?: boolean
	validIfYearGreaterThan?: number
}

const originalValue = ''

export function InputDate<T, N extends (string | (string | null))>(props: IProps<T, N>) {
	const lastDateValue = useRef(originalValue)
	const nextDateValue = useRef(originalValue)
	const [overrideValue, setOverrideValue] = useState(originalValue)
	const changeTimeout = useRef(setTimeout(() => {
	}, 100))

	const inputProps = useMemo(() => ReduceInputProps(OmitProperty(props, 'value', 'onChange', 'onBlur'))
			, [props])

	const inputValue = useMemo(() => DateISO(props.value)?.substring(0, 10) ?? '', [props.value])

	useEffect(() => {
		if (![lastDateValue.current, nextDateValue.current].includes(inputValue)) {
			lastDateValue.current = inputValue
			nextDateValue.current = lastDateValue.current
			setOverrideValue(lastDateValue.current)
		} else {
			lastDateValue.current = inputValue
		}
	}, [inputValue])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		nextDateValue.current = DateISO(e.target.value)?.substring(0, 10) ?? ''

		setOverrideValue(e.target.value)

		if (CleanNumber(nextDateValue.current?.substring(0, 4)) > (props.validIfYearGreaterThan ?? 99)) {
			const customValue: string | null = (nextDateValue.current + ' ' + (TimeOnly(props.value as string) ?? '')).trim()

			if (!!props.onChange) {
				;(e.target as any).customValue = customValue

				props.onChange(e)
			}

			if (!!props.changeValue) {
				props.changeValue(
						customValue as any,
						e.target.name as any,
						(e.nativeEvent as any).shiftKey,
						(e.nativeEvent as any).ctrlKey,
						(e.nativeEvent as any).altKey
				)
			}

			if (!!props.changeValueLate) {
				clearTimeout(changeTimeout.current)
				const name = e.target.name as any
				const shiftKey = (e.nativeEvent as any).shiftKey
				const ctrlKey = (e.nativeEvent as any).ctrlKey
				const altKey = (e.nativeEvent as any).altKey

				changeTimeout.current = setTimeout(() => {
					if (!!props.changeValueLate) {
						props.changeValueLate(
								customValue as any,
								name,
								shiftKey,
								ctrlKey,
								altKey
						)
					}
				}, 500)
			}

			if (!!props.setChanges) {
				props.setChanges(prevState => ({
					...prevState,
					[e.target.name as any]: customValue
				}))
			}
		}
	}

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		if ((props.changeValue || props.setChanges) && (nextDateValue.current || nextDateValue.current !== props.value)) {
			if (nextDateValue.current) {
				const enteredYear = CleanNumber(nextDateValue.current?.substring(0, 4))

				if (enteredYear < 100) {
					const currentYear = new Date().getUTCFullYear()
					const currentCentury = Math.floor(currentYear / 100) * 100
					let newYear = enteredYear + currentCentury
					if (newYear > currentYear + 20) newYear -= 100
					let date = `${newYear.toString().padStart(4, '0')}${nextDateValue.current.substring(4)}`
					if (props.changeValue) {
						props.changeValue(
								`${date} ${TimeOnly(props.value as string) ?? ''}`.trim() as any,
								e.target.name as any,
								(e.nativeEvent as any).shiftKey,
								(e.nativeEvent as any).ctrlKey,
								(e.nativeEvent as any).altKey
						)
					}
					if (props.changeValueLate) {
						clearTimeout(changeTimeout.current)
						props.changeValueLate(
								`${date} ${TimeOnly(props.value as string) ?? ''}`.trim() as any,
								e.target.name as any,
								(e.nativeEvent as any).shiftKey,
								(e.nativeEvent as any).ctrlKey,
								(e.nativeEvent as any).altKey
						)
					}
					if (!!props.setChanges) {
						props.setChanges(prevState => ({
							...prevState,
							[e.target.name as any]: `${date} ${TimeOnly(props.value as string) ?? ''}`.trim() as any
						}))
					}
				}
			} else {
				if (props.changeValue) {
					props.changeValue(
							null as any,
							e.target.name as any,
							(e.nativeEvent as any).shiftKey,
							(e.nativeEvent as any).ctrlKey,
							(e.nativeEvent as any).altKey
					)
				}
				if (props.changeValueLate) {
					clearTimeout(changeTimeout.current)
					props.changeValueLate(
							null as any,
							e.target.name as any,
							(e.nativeEvent as any).shiftKey,
							(e.nativeEvent as any).ctrlKey,
							(e.nativeEvent as any).altKey
					)
				}
				if (!!props.setChanges) {
					props.setChanges(prevState => ({
						...prevState,
						[e.target.name as any]: null
					}))
				}
			}
		}

		if (props.onBlur) props.onBlur(e)
	}

	const className = useMemo(() => !inputProps.className ? 'inputDate form-control' : `${inputProps.className} inputDate form-control`, [inputProps.className])

	return (!!props.plainText ? (
					<div className='form-control-plaintext' {...props.plainTextProps}>
						{!!props.showTime && !!TimeOnly(props.value as string)
								? DateFormat('LocalDateTime', props.value as string)
								: DateOnlyNull(props.value as string, {formatLocale: true, timezoneDisplay: 'UTC'})}
					</div>
			) : (
					<input
							type='date'
							{...inputProps}
							className={className}
							// placeholder='yyyy-mm-dd'
							value={overrideValue ?? ''}
							onChange={handleInputChange}
							onBlur={handleBlur}
							autoComplete={props.autoCompleteOn ? 'on' : `AC_${props.name ?? '' as any}_${RandomString(5)}`}
					/>
			)
	)
}
