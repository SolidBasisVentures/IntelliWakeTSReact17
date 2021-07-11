import React, {useMemo} from 'react'
import {TChangeValueFunction} from './IWInputProps'
import Switch from "react-switch"

export interface IInputSwitchProps<T = unknown> {
	name?: (T extends object ? keyof T : string) | undefined
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	checked: boolean
	label: any
	className?: string
	id?: string
	plainText?: boolean
	changeValue?: TChangeValueFunction<T>
	onClick?: (e: React.MouseEvent<HTMLInputElement>) => void
	hidden?: boolean
	onColor?: string
	offColor?: string
	checkedIcon?: JSX.Element | boolean
	uncheckedIcon?: JSX.Element | boolean
}

export function InputSwitch<T>(props: IInputSwitchProps<T>) {
	const newID = useMemo(() => props.id ?? 'sw' + props.name + Math.floor(Math.random() * 100000 + 1), [
		props.name,
		props.id
	])

	const handleInputChange = (checked: boolean, e: any) => {
		e.target.value = e.target.checked.toString()
		;(e.target as any).customValue = e.target.checked

		if (!!props.onChange) {
			props.onChange(e)
		}

		if (!!props.changeValue) {
			props.changeValue(checked, e.target.name as any, (e.nativeEvent as any).shiftKey, (e.nativeEvent as any).ctrlKey, (e.nativeEvent as any).altKey)
		}
	}

	return (
		<label className={!props.plainText ? "cursor-pointer" : ''}>
			<Switch
				onChange={(checked, e) => {
					if (!props.plainText) {
						handleInputChange(checked, e)
					}
				}}
				name={props.name as string}
				className={'inputSwitch react-switch ' + (props.className ?? '') + (props.plainText ? ' plainText' : '')}
				id={newID}
				hidden={props.hidden}
				checked={props.checked}
				disabled={props.plainText}
				onClick={props.onClick}
				onColor={props.onColor}
				offColor={props.offColor}
				checkedIcon={props.checkedIcon}
				uncheckedIcon={props.uncheckedIcon}
			/>
			{props.label}
		</label>
	
	)
}
