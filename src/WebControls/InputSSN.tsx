import React, {useMemo} from 'react'
import {Form} from 'react-bootstrap'
import {IIWInputProps, ReduceInputProps, ReduceToInputAddProps} from './IWInputProps'
import {InputWrapper} from './InputWrapper'

interface IProps<T = unknown> extends IIWInputProps<T> {
	plainTextLast4Only?: boolean
}

export function InputSSN<T>(props: IProps<T>) {
	const inputProps = useMemo(() => {
		const subset = ReduceInputProps(props)
		delete subset.plainTextLast4Only

		if (subset.autoComplete === undefined) {
			subset.autoComplete = 'off'
		}

		return subset
	}, [props])

	return (
		<InputWrapper
			{...ReduceToInputAddProps(props)}
			className="inputSSN"
			plainTextControl={!!props.plainTextLast4Only ? '...-' + (props.value ?? '').toString().substr(-4) : props.value}>
			<Form.Control type="text" {...inputProps} pattern="\d{3}-?\d{2}-?\d{4}" />
		</InputWrapper>
	)
}
