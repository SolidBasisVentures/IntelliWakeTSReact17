import React from 'react'
import {IInputSwitchProps} from './InputSwitch'

export interface IInputCheckboxProps<T> extends IInputSwitchProps<T> {
	onChange?: (e: any) => void
	onClick?: (e: any) => void
}

export function InputCheckBox<T>(props: IInputCheckboxProps<T>) {
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.target.value = e.target.checked.toString()
		;(e.target as any).customValue = e.target.checked
		
		if (!!props.onChange) {
			props.onChange(e)
		}
		
		if (!!props.changeValue) {
			props.changeValue(
				e.target.checked,
				e.target.name as any,
				(e.nativeEvent as any).shiftKey,
				(e.nativeEvent as any).ctrlKey,
				(e.nativeEvent as any).altKey
			)
		}
	}
	
	return (
		<label className={!props.plainText ? 'cursor-pointer' : ''}>
			<input
				type='checkbox'
				name={props.name as string}
				className={'inputCheckbox mr-1 ' + (props.className ?? '') + (props.plainText ? ' plainText' : '')}
				hidden={props.hidden}
				checked={props.checked}
				onChange={!props.plainText ? handleInputChange : () => {
				}}
				disabled={props.plainText}
				onClick={props.onClick}
			/>
			{props.label}
		</label>
	)
}
