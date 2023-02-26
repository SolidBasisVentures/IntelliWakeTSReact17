import React, {useMemo} from 'react'
import {IIWInputProps, ReduceInputProps, ReduceToInputAddProps} from './IWInputProps'
import {InputWrapper} from './InputWrapper'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'

interface IProps<T = unknown> extends IIWInputProps<T> {
	plainTextLast4Only?: boolean
}

export function InputSSN<T>(props: IProps<T>) {
	const inputProps = useMemo(() => {
		const subset = ReduceInputProps(OmitProperty(props, 'plainTextLast4Only'))

		if (subset.autoComplete === undefined) {
			subset.autoComplete = 'off'
		}

		return subset
	}, [props])

	return (
			<InputWrapper
					{...ReduceToInputAddProps(props)}
					className='inputSSN form-control'
					plainTextControl={!!props.plainTextLast4Only ? '...-' + (props.value ?? '').toString().substring(('...-' + (props.value ?? '').toString()).length - 4) : props.value}>
				<input type='text' {...inputProps} pattern='\d{3}-?\d{2}-?\d{4}' />
			</InputWrapper>
	)
}
