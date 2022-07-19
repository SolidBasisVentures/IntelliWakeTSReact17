import React, {useEffect, useMemo, useRef} from 'react'
import Cleave from 'cleave.js/react'
import {
	CleanNumber,
	CleanNumberNull,
	OmitProperty,
	ToCurrency,
	ToDigits
} from '@solidbasisventures/intelliwaketsfoundation'
import {CleaveOptions} from 'cleave.js/options'
import {IIWInputProps, ReduceInputProps, ReduceToInputAddProps, THTMLChangeElements} from './IWInputProps'
import {InputWrapper} from './InputWrapper'
import {ClassNames} from '../Functions'

export interface IPropsInputNumber<T = any, V = any> extends IIWInputProps<T, V> {
	htmlRef?: (ref: any) => void
	decimalScale?: number | null
	decimalScaleDisplay?: number | null
	integerScale?: number | null
	allowNegative?: boolean
	lowerBound?: number
	upperBound?: number
	currency?: boolean
	plainTextLeft?: boolean
	nullable?: boolean
	increment?: number | null
}

export function InputNumber<T = any, V = any>(props: IPropsInputNumber<T, V>) {
	const cleaveRef = useRef<any>(null)
	const lastValue = useRef<V | undefined>(props.value)
	const updateTimeout = useRef(setTimeout(() => {
	}, 100))
	const inputProps = useMemo<any>(() => ({
		...ReduceInputProps(OmitProperty(props,
			'decimalScale',
			'integerScale',
			'allowNegative',
			'lowerBound',
			'upperBound',
			'currency',
			'replaceEmpty',
			'invalid',
			'decimalScaleDisplay',
			'name',
			'plainTextLeft',
			'nullable')),
		value: (!!props.replaceEmpty && (CleanNumber(props.value) === 0)) ? '' : props.value
	}), [props])
	
	const handleKeyDown = (e: React.KeyboardEvent<any>) => {
		if (e.key === '-') {
			if (!(props.lowerBound !== undefined && props.lowerBound < 0)) {
				if (!props.allowNegative || (props.lowerBound !== undefined && props.lowerBound >= 0)) {
					e.preventDefault()
				}
			}
		}
		
		if (e.key === '.' && props.decimalScale === 0) {
			e.preventDefault()
		}
		
		if (!!props.onKeyDown) props.onKeyDown(e as any)
	}
	
	const onCreditCardInit = (cleave: any) => {
		cleaveRef.current = cleave
	}
	
	useEffect(() => {
		clearTimeout(updateTimeout.current)
		updateTimeout.current = setTimeout(() => {
			if (!!cleaveRef.current && props.value !== lastValue.current) {
				lastValue.current = props.value
				cleaveRef.current.setRawValue(props.value as any)
			}
		}, 250)
		
		return () => {
			clearTimeout(updateTimeout.current)
		}
	}, [props.value])
	
	let options: CleaveOptions = {
		numeral: true,
		numeralThousandsGroupStyle: 'thousand'
	}
	
	options.numeralDecimalScale = props.decimalScale ?? options.numeralDecimalScale ?? undefined
	options.numeralIntegerScale = props.integerScale ?? options.numeralIntegerScale ?? undefined
	if (!!props.currency) {
		options.prefix = '$ '
		options.numeralDecimalScale = props.decimalScale === undefined ? 2 : props.decimalScale ?? undefined
	}
	
	const onBlur = (e: React.FocusEvent<THTMLChangeElements>) => {
		if (props.onBlur) props.onBlur(e)
	}
	
	const hasDecimals = (props.decimalScale ?? 0) > 0
	
	return (
		<InputWrapper<T, V>
			{...ReduceToInputAddProps(props)} inputIsValid={(val) => {
			const cleanNumber = CleanNumberNull(val)
			if (cleanNumber === null) return false
			if (props.lowerBound !== undefined && cleanNumber < props.lowerBound) return false
			if (props.upperBound !== undefined && cleanNumber > props.upperBound) return false
			
			return true
		}}
			valueOnInvalid={() => 0}
			transformToValid={(val) => {
				if (props.nullable && val === '') {
					return null
				}
				let cleanNumber = CleanNumber(val)
				if (props.lowerBound !== undefined && cleanNumber < props.lowerBound) {
					cleanNumber = props.lowerBound
				}
				if (props.upperBound !== undefined && cleanNumber > props.upperBound) {
					cleanNumber = props.upperBound
				}
				lastValue.current = cleanNumber as any
				return cleanNumber
			}}
			className={ClassNames({
				'inputNumber form-control': true,
				numerics: hasDecimals,
				integers: !hasDecimals
			})}
			plainTextControl={(!props.value && !!props.replaceEmpty) ?
				(props.replaceEmpty === true ? <>&nbsp;</> : props.replaceEmpty) :
				(!!props.currency
					? ToCurrency(props.value, props.decimalScaleDisplay ?? options.numeralDecimalScale)
					: ToDigits(props.value, props.decimalScaleDisplay ?? options.numeralDecimalScale))
			}
			plainTextProps={{
				...props.plainTextProps,
				className: `form-control-plaintext${props.plainTextLeft ?
					'' :
					' text-end'} ${props.plainTextProps?.className ?? ''}`.trim()
			}}
			invalid={props.invalid}
			isEqual={(internal, props) => CleanNumber(internal) === CleanNumber(props)}>
			<Cleave options={options}
			        htmlRef={props.htmlRef}
			        inputMode={hasDecimals ? 'decimal' : 'numeric'}
			        onKeyDown={handleKeyDown}
			        {...inputProps}
			        onInit={onCreditCardInit}
			        name={props.name as any}
			        onBlur={onBlur} />
		</InputWrapper>
	)
}
