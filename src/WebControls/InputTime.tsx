import React, {useEffect, useMemo, useRef, useState} from 'react'
import {IIWInputProps, ReduceInputProps} from './IWInputProps'
import {DateISO, OmitProperty, TimeOnly} from '@solidbasisventures/intelliwaketsfoundation'

interface IProps<T, N> extends IIWInputProps<T, N> {
	includeDate?: boolean
	editSeconds?: boolean
}

const originalValue = ''

export function InputTime<T, N extends string | (string | null)>(props: IProps<T, N>) {
	const lastTimeValue = useRef(originalValue)
	const nextTimeValue = useRef(originalValue)
	const [overrideValue, setOverrideValue] = useState(originalValue)

	const inputProps = useMemo(() => ReduceInputProps(OmitProperty(props, 'value', 'onChange', 'editSeconds')), [props])

	useEffect(() => {
		if (![lastTimeValue.current, nextTimeValue.current].includes(TimeOnly(props.value as string) ?? '')) {
			lastTimeValue.current = TimeOnly((props.value ?? '') as string) ?? ''
			nextTimeValue.current = lastTimeValue.current
			setOverrideValue(
					TimeOnly(lastTimeValue.current) ?? ''
			)
		} else {
			lastTimeValue.current = TimeOnly((props.value ?? '') as string) ?? ''
		}
	}, [props.value, props.editSeconds])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		nextTimeValue.current = TimeOnly(e.target.value) ?? ''

		setOverrideValue(e.target.value)

		const customValue =`${DateISO(props.value)?.substring(0, 10) ?? ''} ${nextTimeValue.current}`.trim()

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
	}

	return (
			<>
				{!!props.plainText ? (
						<div className='form-control-plaintext' {...props.plainTextProps}>
							{TimeOnly(props.value as string, {formatLocale: true})}
						</div>
				) : (
						<input
								type='time'
								className='inputTime form-control'
								{...inputProps}
								value={overrideValue}
								onChange={handleInputChange}
								step={!!props.editSeconds ? 1 : 60}
						/>
				)}
			</>
	)
}
