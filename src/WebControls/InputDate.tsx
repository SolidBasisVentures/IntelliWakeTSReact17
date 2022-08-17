import React, {useEffect, useMemo, useRef, useState} from 'react'
import {IIWInputProps, ReduceInputProps} from './IWInputProps'
import {DateObject, OmitProperty, RandomString} from '@solidbasisventures/intelliwaketsfoundation'
import {MomentDateString, MomentDisplayDayDate, MomentDisplayDayDateTime, MomentTimeString} from '../Moment'

interface IProps<T = unknown> extends IIWInputProps<T> {
	showTime?: boolean
	validIfYearGreaterThan?: number
}

const originalValue = ' '

export function InputDate<T>(props: IProps<T>) {
	const lastDateValue = useRef(originalValue)
	const nextDateValue = useRef(originalValue)
	const [overrideValue, setOverrideValue] = useState(originalValue)
	const changeTimeout = useRef(setTimeout(() => {
	}, 100))
	
	const inputProps = useMemo(() => ReduceInputProps(OmitProperty(props, 'value', 'onChange', 'onBlur'))
		, [props])
	
	useEffect(() => {
		if (![lastDateValue.current, nextDateValue.current].includes(MomentDateString(props.value as string) ?? '')) {
			lastDateValue.current = MomentDateString((props.value ?? '') as string) ?? ''
			nextDateValue.current = lastDateValue.current
			setOverrideValue(lastDateValue.current)
		} else {
			lastDateValue.current = MomentDateString((props.value ?? '') as string) ?? ''
		}
	}, [props.value])
	
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		nextDateValue.current = MomentDateString(e.target.value) ?? ''
		
		setOverrideValue(e.target.value)
		
		if ((DateObject(e.target.value)?.getFullYear() ?? 0) > (props.validIfYearGreaterThan ?? 99)) {
			const customValue = (nextDateValue.current + ' ' + (MomentTimeString(props.value as string) ?? '')).trim()
			
			if (!!props.onChange) {
				;(e.target as any).customValue = customValue
				
				props.onChange(e)
			}
			
			if (!!props.changeValue) {
				props.changeValue(
					customValue,
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
							customValue,
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
							((MomentDateString(dateObj) ?? '') + ' ' + (MomentTimeString(props.value as string) ?? '')).trim(),
							e.target.name as any,
							(e.nativeEvent as any).shiftKey,
							(e.nativeEvent as any).ctrlKey,
							(e.nativeEvent as any).altKey
						)
					}
					if (props.changeValueLate) {
						clearTimeout(changeTimeout.current)
						props.changeValueLate(
							((MomentDateString(dateObj) ?? '') + ' ' + (MomentTimeString(props.value as string) ?? '')).trim(),
							e.target.name as any,
							(e.nativeEvent as any).shiftKey,
							(e.nativeEvent as any).ctrlKey,
							(e.nativeEvent as any).altKey
						)
					}
					if (!!props.setChanges) {
						props.setChanges(prevState => ({
							...prevState,
							[e.target.name as any]: ((MomentDateString(dateObj) ?? '') + ' ' + (MomentTimeString(props.value as string) ?? '')).trim()
						}))
					}
				}
			} else {
				if (props.changeValue) {
					props.changeValue(
						null,
						e.target.name as any,
						(e.nativeEvent as any).shiftKey,
						(e.nativeEvent as any).ctrlKey,
						(e.nativeEvent as any).altKey
					)
				}
				if (props.changeValueLate) {
					clearTimeout(changeTimeout.current)
					props.changeValueLate(
						null,
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
	
	return (
		<>
			{!!props.plainText ? (
				<div className='form-control-plaintext' {...props.plainTextProps}>
					{!!props.showTime && !!MomentTimeString(props.value as string)
						? MomentDisplayDayDateTime(props.value as string)
						: MomentDisplayDayDate(props.value as string)}
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
			)}
		</>
	)
}
