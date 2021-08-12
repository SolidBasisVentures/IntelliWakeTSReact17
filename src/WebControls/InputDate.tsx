import React, {useEffect, useMemo, useRef, useState} from 'react'
import {IIWInputProps, ReduceInputProps} from './IWInputProps'
import {
	DayjsDateString, DayjsDisplayDayDate, DayjsDisplayDayDateTime, DayjsTimeString, OmitProperty,
	RandomString
} from '@solidbasisventures/intelliwaketsfoundation'

interface IProps<T = unknown> extends IIWInputProps<T> {
	showTime?: boolean
}

const originalValue = ' '

export function InputDate<T>(props: IProps<T>) {
	const lastDateValue = useRef(originalValue)
	const nextDateValue = useRef(originalValue)
	const [overrideValue, setOverrideValue] = useState(originalValue)
	
	const inputProps = useMemo(() => ReduceInputProps(OmitProperty(props, 'value', 'onChange'))
		, [props])
	
	useEffect(() => {
		if (![lastDateValue.current, nextDateValue.current].includes(DayjsDateString(props.value as string) ?? '')) {
			lastDateValue.current = DayjsDateString((props.value ?? '') as string) ?? ''
			nextDateValue.current = lastDateValue.current
			setOverrideValue(lastDateValue.current)
		} else {
			lastDateValue.current = DayjsDateString((props.value ?? '') as string) ?? ''
		}
	}, [props.value])
	
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		nextDateValue.current = DayjsDateString(e.target.value) ?? ''
		
		setOverrideValue(e.target.value)
		
		const customValue = (nextDateValue.current + ' ' + (DayjsTimeString(props.value as string) ?? '')).trim()
		
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
	}
	
	return (
		<>
			{!!props.plainText ? (
				<div className='form-control-plaintext' {...props.plainTextProps}>
					{!!props.showTime && !!DayjsTimeString(props.value as string)
						? DayjsDisplayDayDateTime(props.value as string)
						: DayjsDisplayDayDate(props.value as string)}
				</div>
			) : (
				<input
					type='date'
					className='inputDate form-control'
					{...inputProps}
					placeholder='yyyy-mm-dd'
					value={overrideValue ?? ''}
					onChange={handleInputChange}
					autoComplete={props.autoCompleteOn ? 'on' : `AC_${props.name ?? ''}_${RandomString(5)}`}
				/>
			)}
		</>
	)
}
