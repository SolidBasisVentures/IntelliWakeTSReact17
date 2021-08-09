import React, {useEffect, useState} from 'react'
import {IInputSwitchProps} from './InputSwitch'

export interface IInputCheckboxProps<T> extends IInputSwitchProps<T> {
	onChange?: (e: any) => void
	onClick?: (e: any) => void
	disabled?: boolean
}

export function InputCheckBox<T>(props: IInputCheckboxProps<T>) {
	const [showChecked, setShowChecked] = useState(props.checked)
	
	useEffect(() => {
		setShowChecked(props.checked)
	}, [props.checked])
	
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
		
		setShowChecked(e.target.checked)
	}
	
	return (
		<label className={'inputCheckbox form-control-plaintext ' + (!props.plainText ? 'cursor-pointer ' : '') + (props.className ?? '')}>
			<input
				type='checkbox'
				name={props.name as string}
				className={'mr-1 ' + (props.switchClassName ?? '') + (props.plainText ? ' plainText' : '')}
				hidden={props.hidden}
				checked={showChecked}
				onChange={!props.plainText ? handleInputChange : () => {
				}}
				disabled={props.disabled}
				onClick={props.onClick}
			/>
			<span>{props.label}</span>
		</label>
	)
}
