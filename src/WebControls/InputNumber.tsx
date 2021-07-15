import React, {useMemo} from 'react'
import Cleave from 'cleave.js/react'
import {CleanNumber, OmitProperty, ToCurrency, ToDigits} from '@solidbasisventures/intelliwaketsfoundation'
import {IIWInputProps, ILegacyInputProps, ReduceInputProps, ReduceToInputAddProps} from './IWInputProps'
import {CleaveOptions} from 'cleave.js/options'
import {ClassNames} from '../Functions'
import {InputWrapper} from './InputWrapper'

export interface IPropsInputNumber<T = any, V = any> extends IIWInputProps<T, V> {
	htmlRef?: (ref: any) => void
	decimalScale?: number | null
	decimalScaleDisplay?: number | null
	integerScale?: number | null
	allowNegative?: boolean
	lowerBound?: number
	upperBound?: number
	currency?: boolean
	hideZero?: boolean
}

export function InputNumber<T = any, V = any>(props: IPropsInputNumber<T, V>) {
	const inputProps = useMemo<ILegacyInputProps>(() => ReduceInputProps(OmitProperty(props,
		'decimalScale',
		'integerScale',
		'allowNegative',
		'lowerBound',
		'upperBound',
		'currency',
		'hideZero',
		'invalid',
		'decimalScaleDisplay', 'name')), [props])
	
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
		
		if (!!props.onKeyDown) props.onKeyDown(e)
	}
	
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
	
	const hasDecimals = (props.decimalScale ?? 0) > 0
	
	return (
		<InputWrapper<T, V>
			{...ReduceToInputAddProps(props)}
			inputIsValid={(val) => !isNaN(CleanNumber(val, undefined, true))}
			valueOnInvalid={() => 0}
			transformToValid={(val) => {
				const cleanNumber = CleanNumber(val)
				if (props.lowerBound !== undefined && cleanNumber < props.lowerBound) return props.lowerBound
				if (props.upperBound !== undefined && cleanNumber > props.upperBound) return props.upperBound
				return cleanNumber
			}}
			className={ClassNames({
				'inputNumber form-control': true,
				numerics: hasDecimals,
				integers: !hasDecimals
			})}
			plainTextControl={!!props.currency
				? ToCurrency(props.value, props.decimalScaleDisplay ?? options.numeralDecimalScale)
				: ToDigits(props.value, props.decimalScaleDisplay ?? options.numeralDecimalScale)
			}
			plainTextProps={`text-right ${props.plainTextProps ?? ''}`.trim()}
			invalid={props.invalid}
			isEqual={(internal, props) => CleanNumber(internal) === CleanNumber(props)}>
			<Cleave
				options={options}
				htmlRef={props.htmlRef}
				inputMode={hasDecimals ? 'decimal' : 'numeric'}
				onKeyDown={handleKeyDown}
				{...inputProps}
				name={props.name as any}
			/>
		</InputWrapper>
	)
}
