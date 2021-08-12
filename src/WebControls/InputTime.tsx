import React, {useEffect, useMemo, useRef, useState} from 'react'
import {IIWInputProps, ReduceInputProps} from './IWInputProps'
import {OmitProperty
} from '@solidbasisventures/intelliwaketsfoundation'
import {
	DAYJS_FORMAT_TIME_NO_SECONDS,
	DAYJS_FORMAT_TIME_SECONDS, DayjsDateString, DayjsDisplayTime,
	DayjsFormatString,
	DayjsTimeString
} from '../Dayjs'

interface IProps<T = unknown> extends IIWInputProps<T> {
	includeDate?: boolean
	editSeconds?: boolean
}

const originalValue = ' '

export function InputTime<T>(props: IProps<T>) {
	const lastTimeValue = useRef(originalValue)
	const nextTimeValue = useRef(originalValue)
	const [overrideValue, setOverrideValue] = useState(originalValue)

	const inputProps = useMemo(() => ReduceInputProps(OmitProperty(props, 'value', 'onChange', 'editSeconds')), [props])

	useEffect(() => {
		if (![lastTimeValue.current, nextTimeValue.current].includes(DayjsTimeString(props.value as string) ?? '')) {
			lastTimeValue.current = DayjsTimeString((props.value ?? '') as string) ?? ''
			nextTimeValue.current = lastTimeValue.current
			setOverrideValue(
				DayjsFormatString(
					lastTimeValue.current,
					!!props.editSeconds ? DAYJS_FORMAT_TIME_SECONDS : DAYJS_FORMAT_TIME_NO_SECONDS
				) ?? ''
			)
		} else {
			lastTimeValue.current = DayjsTimeString((props.value ?? '') as string) ?? ''
		}
	}, [props.value, props.editSeconds])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		nextTimeValue.current = DayjsTimeString(e.target.value) ?? ''

		setOverrideValue(e.target.value)

		const customValue = ((DayjsDateString(props.value as string) ?? '') + ' ' + nextTimeValue.current).trim()

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
				<div className="form-control-plaintext" {...props.plainTextProps}>
					{DayjsDisplayTime(props.value as string)}
				</div>
			) : (
				<input
					type="time"
					className="inputTime form-control"
					{...inputProps}
					value={overrideValue}
					onChange={handleInputChange}
					step={!!props.editSeconds ? 1 : 60}
				/>
			)}
		</>
	)
}
