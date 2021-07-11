import React, {Ref} from 'react'
import {IIWInputProps, ReduceInputProps, ReduceToInputAddProps} from './IWInputProps'
import {InputWrapper} from './InputWrapper'

interface IProps<T = any, V = any, H = HTMLInputElement> extends IIWInputProps<T, V, H> {}

export const InputText = <T, V, H>(props: IProps<T, V, H> & {ref?: Ref<HTMLInputElement>}) => {
	return (
		<InputWrapper {...ReduceToInputAddProps(props)} className="inputText">
			<input type="text" {...ReduceInputProps(props, 'form-control')} required={props.required} ref={props.ref} />
		</InputWrapper>
	)
}
