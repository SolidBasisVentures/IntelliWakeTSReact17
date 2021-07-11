import React, {useMemo} from 'react'
import {IIWInputProps, ReduceInputProps, ReduceToInputAddProps} from './IWInputProps'
import {FormatZip, OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'
import {InputWrapper} from './InputWrapper'

export interface IZipProps<T = unknown> extends IIWInputProps<T> {
	withNine?: boolean
}

export function InputZip<T>(props: IZipProps<T>) {
	const inputProps = useMemo(() => ReduceInputProps(OmitProperty(props, 'withNine'))
			, [props])

	return (
		<InputWrapper
			{...ReduceToInputAddProps(props)}
			className="inputZip"
			plainTextControl={FormatZip((props.value ?? '').toString())}>
			<input type="text" {...inputProps} />
		</InputWrapper>
	)
}
