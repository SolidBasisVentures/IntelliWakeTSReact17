import React, {useEffect, useMemo, useRef, useState} from 'react'
import {IIWInputProps, ReduceInputProps} from './IWInputProps'
import {
	DateFormat,
	DateObject,
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

	const inputValue = useMemo(() => DateOnlyNull(props.value) ?? '', [props.value])

	useEffect(() => {
		if (![lastDateValue.current, nextDateValue.current].includes(inputValue)) {
			console.log('Effecting Last', lastDateValue.current, 'Next', nextDateValue.current, 'Input', inputValue)
			lastDateValue.current = inputValue
			nextDateValue.current = lastDateValue.current
			setOverrideValue(lastDateValue.current)
		} else {
			console.log('Effecting 2')
			lastDateValue.current = inputValue
		}
	}, [inputValue])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		nextDateValue.current = DateOnlyNull(e.target.value) ?? ''

		console.log('HIC', e.target.value, nextDateValue.current, overrideValue)

		setOverrideValue(e.target.value)

		if ((DateObject(e.target.value)?.getFullYear() ?? 0) > (props.validIfYearGreaterThan ?? 99)) {
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
		// nextDateValue.current = MomentDateString(e.target.value) ?? ''

		console.log('Blurring')

		if ((props.changeValue || props.setChanges) && (nextDateValue.current || nextDateValue.current !== props.value)) {
			const dateObj = DateObject(nextDateValue.current)
			const enteredYear = dateObj?.getUTCFullYear() ?? 0

			if (dateObj) {
				if (enteredYear < 100) {
					const currentYear = new Date().getUTCFullYear()
					const currentCentury = Math.floor(currentYear / 100) * 100
					let newYear = dateObj.getUTCFullYear() + currentCentury
					if (newYear > currentYear + 20) newYear -= 100
					dateObj.setUTCFullYear(newYear)
					if (props.changeValue) {
						props.changeValue(
								((DateOnlyNull(dateObj) ?? '') + ' ' + (TimeOnly(props.value as string) ?? '')).trim() as any,
								e.target.name as any,
								(e.nativeEvent as any).shiftKey,
								(e.nativeEvent as any).ctrlKey,
								(e.nativeEvent as any).altKey
						)
					}
					if (props.changeValueLate) {
						clearTimeout(changeTimeout.current)
						props.changeValueLate(
								((DateOnlyNull(dateObj) ?? '') + ' ' + (TimeOnly(props.value as string) ?? '')).trim() as any,
								e.target.name as any,
								(e.nativeEvent as any).shiftKey,
								(e.nativeEvent as any).ctrlKey,
								(e.nativeEvent as any).altKey
						)
					}
					if (!!props.setChanges) {
						props.setChanges(prevState => ({
							...prevState,
							[e.target.name as any]: ((DateOnlyNull(dateObj) ?? '') + ' ' + (TimeOnly(props.value as string) ?? '')).trim()
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
								: DateOnlyNull(props.value as string, {formatLocale: true})}
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
							autoComplete={props.autoCompleteOn ? 'on' : `AC_${props.name ?? ''}_${RandomString(5)}`}
					/>
			)
	)
}
