import React, {Dispatch, ReactNode, SetStateAction} from 'react'
import {ClassNames, ElementCustomValue, TClassNames} from '../Functions'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'

export type TChangeValueFunction<T = any, V = any> = (
	value: V,
	name?: (T extends object ? keyof T : string) | undefined,
	shiftKey?: boolean,
	ctrlKey?: boolean,
	altKey?: boolean
) => void

export interface IIWInputAddProps<T = any, V = any> {
	plainText?: boolean
	plainTextURL?: string
	plainTextProps?: any
	plainOnClick?: () => void
	replaceEmpty?: ReactNode | boolean
	changeValue?: TChangeValueFunction<T, V>
	changeValueLate?: TChangeValueFunction<T, V>
	setChanges?: Dispatch<SetStateAction<T>>
	setChangesLate?: Dispatch<SetStateAction<T>>
	autoCompleteOn?: boolean
	autoComplete?: string
	prepend?: ReactNode
	append?: ReactNode
	invalid?: boolean
	consoleVerbose?: boolean
}

export type THTMLChangeElements = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

export type TLegacyInputType =
	| 'text'
	| 'email'
	| 'select'
	| 'file'
	| 'radio'
	| 'checkbox'
	| 'textarea'
	| 'button'
	| 'reset'
	| 'submit'
	| 'date'
	| 'datetime-local'
	| 'hidden'
	| 'image'
	| 'month'
	| 'number'
	| 'range'
	| 'search'
	| 'tel'
	| 'url'
	| 'week'
	| 'password'
	| 'datetime'
	| 'time'
	| 'color'

export interface ILegacyInputProps<T = THTMLChangeElements> extends React.InputHTMLAttributes<T> {
	// [key: string]: any
	type?: TLegacyInputType
	// bsSize?: 'lg' | 'sm'
	// valid?: boolean
	invalid?: boolean
	// tag?: React.ElementType
	// innerRef?: React.Ref<T>
	plaintext?: boolean
	// addon?: boolean
}

export interface IIWInputProps<T = any, V = any, H = THTMLChangeElements>
	extends Omit<ILegacyInputProps<H>, 'value' | 'name'>,
		IIWInputAddProps<T, V> {
	name?: T extends object ? keyof T : string
	value?: V
}

export const ReduceInputProps = <T = any, V = any, H = THTMLChangeElements>(
	props: IIWInputProps<T, V, H> | any,
	classNameAdd?: string | string[] | TClassNames
): ILegacyInputProps => {
	const subset = OmitProperty(
		props,
		'plainText',
		'plainTextURL',
		'plainTextProps',
		'changeValue',
		'changeValueLate',
		'setChanges',
		'setChangesLate',
		'autoCompleteOn',
		'replaceEmpty',
		'append',
		'prepend',
		'invalid',
		'innerRef',
		'consoleVerbose'
	)
	
	if (!!classNameAdd) {
		if (typeof classNameAdd === 'string') {
			subset.className = `${subset.className ?? ''} ${classNameAdd}`.trim()
		} else if (Array.isArray(classNameAdd)) {
			subset.className = `${subset.className ?? ''} ${classNameAdd.join(' ')}`.trim()
		} else {
			subset.className = `${subset.className ?? ''} ${ClassNames(classNameAdd)}`.trim()
		}
	}
	
	if (props.autoFocus) {
		subset.className = `${subset.className ?? ''} inputAutoFocus`.trim()
	}
	
	return subset
}

export const ReduceToInputAddProps = <T = any, V = any>(props: IIWInputProps<T, V> | any): IIWInputAddProps<T, V> => {
	return {
		plainText: props.plainText,
		plainTextURL: props.plainTextURL,
		plainTextProps: props.plainTextProps,
		replaceEmpty: props.replaceEmpty,
		changeValue: props.changeValue,
		changeValueLate: props.changeValueLate,
		setChanges: props.setChanges,
		setChangesLate: props.setChangesLate,
		autoCompleteOn: props.autoCompleteOn,
		autoComplete: props.autoComplete,
		prepend: props.prepend,
		append: props.append,
		invalid: props.invalid,
		consoleVerbose: props.consoleVerbose
	}
}

export const HandleChangeValue = <T = any, V = any, H = any>(
	e: React.ChangeEvent<H>,
	changeValue?: TChangeValueFunction<T, V>,
	onChange?: (e: React.ChangeEvent<H>) => void,
	setChanges?: Dispatch<SetStateAction<T>>
) => {
	if (!!changeValue) {
		changeValue(ElementCustomValue(e) as V, (e.target as any).name as any)
	}
	
	if (!!setChanges) {
		setChanges(prevState => ({...prevState, [(e.target as any).name as any]: ElementCustomValue(e) as V}))
	}
	
	if (!!onChange) {
		onChange(e)
	}
}

//  onChange={(e) => handleChangeValue(e, props.changeValue, props.onChange)}
