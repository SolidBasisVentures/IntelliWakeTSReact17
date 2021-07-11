import React, {useMemo} from 'react'
import {CleanNumber, OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'
import {
	IIWInputAddProps,
	IIWInputProps,
	ILegacyInputProps,
	ReduceInputProps,
	ReduceToInputAddProps
} from './IWInputProps'
import {InputWrapper} from './InputWrapper'

export interface IPropsSelect<T = any, V = any, H = HTMLSelectElement> extends IIWInputProps<T, V, H> {
	innerRef?: (ref: any) => void
	children?: any
	isNumeric?: boolean
	isNumericOrNull?: boolean
	isStringOrNull?: boolean
	plainOnClick?: () => void
	multiple?: boolean
	required?: boolean
}

export function InputSelect<T, V>(props: IPropsSelect<T, V>) {
	const inputProps = useMemo<ILegacyInputProps>(() => ReduceInputProps<T, V, HTMLSelectElement>(OmitProperty(props, 'isNumeric', 'isNumericOrNull', 'plainOnClick', 'isStringOrNull'))
		, [props])
	
	const wrapperProps = useMemo<IIWInputAddProps>(() => ReduceToInputAddProps(OmitProperty(props, 'plainTextURL', 'plainText', 'plainTextProps')), [props])
	
	return (
		<InputWrapper
			{...wrapperProps}
			className={'inputSelect form-control' + (props.plainText ? ' disabledLink' : '')}
			transformToValid={(val, e) => {
				if (!!props.multiple) {
					if (!!props.isNumeric) {
						return (Array.from(e.target.children) as HTMLOptionElement[])
							.filter((child) => child.selected)
							.map((child) => CleanNumber(child.value))
					} else {
						return (Array.from(e.target.children) as HTMLOptionElement[])
							.filter((child) => child.selected)
							.map((child) => child.value)
					}
				} else if (!!props.isNumeric || !!props.isNumericOrNull) {
					const value = CleanNumber(val)
					
					if (!!props.isNumericOrNull && value === 0) {
						return null
					} else {
						return value
					}
				} else if (!!props.isStringOrNull && !val) {
					return null
				}
				
				return val
			}}
			internalStateValue={(val, e) => {
				if (!!props.multiple) {
					if (!!props.isNumeric) {
						return (Array.from(e.target.children) as HTMLOptionElement[])
							.filter((child) => child.selected)
							.map((child) => CleanNumber(child.value))
					} else {
						return (Array.from(e.target.children) as HTMLOptionElement[])
							.filter((child) => child.selected)
							.map((child) => child.value)
					}
				}
				
				return val
			}}>
			<select
				{...inputProps}
				value={inputProps.value ?? ''}
				style={{
					...props.style,
					pointerEvents: !!props.plainText ? 'none' : undefined
				}}
				tabIndex={!!props.plainText ? -1 : undefined}>
				{props.children}
			</select>
		</InputWrapper>
	)
}
