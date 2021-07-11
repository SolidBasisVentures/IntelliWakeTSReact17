import React from 'react'
import {TChangeValueFunction} from './IWInputProps'
import Switch from 'react-switch'

export interface IInputSwitchProps<T = unknown> {
	name?: (T extends object ? keyof T : string) | undefined
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	checked: boolean
	label: any
	className?: string
	id?: string
	plainText?: boolean
	changeValue?: TChangeValueFunction<T>
	hidden?: boolean
	onColor?: string
	offColor?: string
	checkedIcon?: JSX.Element | boolean
	uncheckedIcon?: JSX.Element | boolean
	height?: number
	width?: number
	size?: "sm" | "lg"
}

export function InputSwitch<T>(props: IInputSwitchProps<T>) {
	const handleInputChange = (checked: boolean, e: any) => {
		if (!!props.onChange) {
			props.onChange(e)
		}

		if (!!props.changeValue) {
			props.changeValue(checked, e.target.name as any, (e.nativeEvent as any).shiftKey, (e.nativeEvent as any).ctrlKey, (e.nativeEvent as any).altKey)
		}
	}
	
	const height = props.height ?? props.size === 'sm' ? 12 : props.size === 'lg' ? 18 : 14
	const width = props.width ?? props.size === 'sm' ? 22 : props.size === 'lg' ? 30 : 26

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
				hidden={props.hidden}
				checked={props.checked}
				disabled={props.plainText}
				onColor={props.onColor}
				offColor={props.offColor}
				checkedIcon={props.checkedIcon ?? false}
				uncheckedIcon={props.uncheckedIcon ?? false}
				height={height}
				width={width}
			/>
			{props.label}
		</label>
	
	)
}
