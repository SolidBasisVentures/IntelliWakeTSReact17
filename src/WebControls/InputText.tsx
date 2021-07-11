import React, {forwardRef} from 'react'
import {IIWInputProps, ReduceInputProps, ReduceToInputAddProps} from './IWInputProps'
import {InputWrapper} from './InputWrapper'

interface IProps<T = any, V = any, H = HTMLInputElement> extends IIWInputProps<T, V, H> {}

export const InputText = forwardRef<HTMLInputElement, IProps>((props, ref ) => {
	return (
		<InputWrapper {...ReduceToInputAddProps(props)} className="inputText">
			<input type="text" {...ReduceInputProps(props, 'form-control')} required={props.required} ref={ref} />
		</InputWrapper>
	)
})
