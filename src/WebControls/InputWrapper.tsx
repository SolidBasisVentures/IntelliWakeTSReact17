import React, {ReactElement, ReactNode, useEffect, useRef, useState} from 'react'
import {IIWInputAddProps, IIWInputProps, ILegacyInputProps, ReduceInputProps, THTMLChangeElements} from './IWInputProps'
import {InputGroupWrapper} from './InputGroupWrapper'
import {RandomString} from '@solidbasisventures/intelliwaketsfoundation'
import {AppendPrependWrapper} from './AppendPrependWrapper'
import {Link} from 'react-router-dom'

interface IProps<T = any, V = any, H = THTMLChangeElements> extends IIWInputAddProps<T, V> {
	children: ReactElement<IIWInputProps<T, V, H>>
	className?: string
	inputIsValid?: (value: any) => boolean
	valueOnInvalid?: (value: any) => any
	transformToValid?: (value: any, e: any) => any
	doNotSelectOnFocus?: boolean
	plainTextControl?: ReactNode
	invalid?: boolean
	lateDelayMS?: number
	isEqual?: (internalValue: any, endValue: any) => boolean
	internalStateValue?: (value: any, e: any) => any
}

export const InputWrapper = <T, V, H = THTMLChangeElements>(props: IProps<T, V, H>) => {
	const isMounted = useRef(false)
	const lateTrigger = useRef(setTimeout(() => {
	}, 100))

	interface IState {
		name?: (T extends object ? keyof T : string) | undefined
		value: V
		shiftKey: boolean
		ctrlKey: boolean
		altKey: boolean
	}

	const lateState = useRef<IState | undefined>(undefined)

	const [internalState, setInternalState] = useState<ILegacyInputProps['value'] | undefined>(
		props.children.props.value as ILegacyInputProps['value'] | undefined
	)
	const isManagingDirtyState = useRef(false)

	const verbose = props.consoleVerbose

	if (props.consoleVerbose) {
		console.info('IntState', props.children.props.name, ' = ', internalState)
	}

	useEffect(() => {
		isMounted.current = true

		return () => {
			isMounted.current = false
		}
	})

	useEffect(() => {
		// lateState.current = undefined
		if (
			lateState.current === undefined &&
			!isManagingDirtyState.current &&
			(!!props.isEqual
				? !props.isEqual(internalState, props.children.props.value)
				: internalState !== props.children.props.value) &&
			(!props.valueOnInvalid || props.children.props.value !== props.valueOnInvalid(internalState))
		) {
			if (verbose) {
				console.info('UE Val', props.children.props.value)
			}
			setInternalState(props.children.props.value as any)
		} else if (verbose) {
			console.info('UE Val NC', props.children.props.value, lateState.current, isManagingDirtyState.current, (!!props.isEqual
					? !props.isEqual(internalState, props.children.props.value)
					: internalState !== props.children.props.value), props.invalid,
				props.valueOnInvalid, !!props.valueOnInvalid && props.children.props.value !== props.valueOnInvalid(internalState))
		}
	}, [props.children.props.value])

	// noinspection PointlessBooleanExpressionJS
	return (
		<>
			{props.plainText ? (
				!!props.plainTextURL ? (
					<Link to={props.plainTextURL}>
						<div className='form-control-plaintext ' {...props.plainTextProps}>
							<AppendPrependWrapper append={props.append} prepend={props.prepend}>
								{(!!props.replaceEmpty && !(props.plainTextControl ?? props.children.props.value)) ? (props.replaceEmpty === true ? <>&nbsp;</> : props.replaceEmpty) : (props.plainTextControl ?? props.children.props.value)}
							</AppendPrependWrapper>
						</div>
					</Link>
				) : (
					<div
						className={'form-control-plaintext' + (!!props.plainOnClick ? ' hoverAction cursor-pointer' : '')}
						{...props.plainTextProps}
						onClick={() => {
							if (!!props.plainOnClick) props.plainOnClick()
						}}>
						<AppendPrependWrapper append={props.append} prepend={props.prepend}>
							{(!!props.replaceEmpty && !(props.plainTextControl ?? props.children.props.value)) ? (props.replaceEmpty === true ? <>&nbsp;</> : props.replaceEmpty) : (props.plainTextControl ?? props.children.props.value)}
						</AppendPrependWrapper>
					</div>
				)
			) : (
				<InputGroupWrapper append={props.append} prepend={props.prepend}>
					{React.cloneElement<any>(
						props.children,
						ReduceInputProps({
							...props.children.props,
							className: (
								(props.children.props.className ?? '') +
								' ' +
								(props.className ?? '') +
								(props.invalid ? ' is-invalid' : '') +
								(props.invalid === false ? ' is-valid' : '') +
								(props.children.props.required ? ' is-required' : '')
							).trim(),
							onFocus: (e: React.FocusEvent<THTMLChangeElements>) => {
								if (!props.doNotSelectOnFocus && 'select' in e.target) e.target.select()
								if (props.children.props.onFocus) props.children.props.onFocus(e as any)
							},
							onBlur: (e: React.FocusEvent<THTMLChangeElements>) => {
								clearTimeout(lateTrigger.current)
								if (
									!!props.changeValueLate &&
									lateState.current !== undefined &&
									lateState.current.value !== props.children.props.value
								) {
									props.changeValueLate(
										lateState.current.value,
										!lateState.current.name ? undefined : lateState.current.name,
										lateState.current?.shiftKey,
										lateState.current?.ctrlKey,
										lateState.current?.altKey
									)
									lateState.current = undefined
								} else if (
									!!props.setChangesLate &&
									lateState.current !== undefined &&
									lateState.current.value !== props.children.props.value
								) {
									props.setChangesLate(prevState => ({
										...prevState,
										[props.children.props.name as any]: lateState.current?.value as V
									}))
									lateState.current = undefined
								}
								if (props.children.props.onBlur) props.children.props.onBlur(e as any)
							},
							onChange: (e: React.ChangeEvent<THTMLChangeElements>) => {
								const eTargetValue = e.target.value

								clearTimeout(lateTrigger.current)

								if (!props.plainText && !props.children.props.disabled) {
									const isValid =
										!props.inputIsValid || props.inputIsValid(eTargetValue)

									isManagingDirtyState.current = !isValid

									let customValue = (
										!isValid
											? !!props.valueOnInvalid
												? props.valueOnInvalid(eTargetValue)
												: ''
											: ((!props.transformToValid ? eTargetValue : props.transformToValid(eTargetValue, e)) as any)
									) as V

									if (verbose) {
										console.info('targetValue', eTargetValue)
										console.info('isValid', isValid)
										console.info('valueOnInvalid', !!props.valueOnInvalid)
										console.info('props.transformToValid', !!props.transformToValid)
										console.info('customValue', customValue)
									}
									;(e.target as any).customValue = customValue

									const newState: IState = {
										value: customValue,
										name: e.target.name as any,
										shiftKey: (e.nativeEvent as any)?.shiftKey,
										ctrlKey: (e.nativeEvent as any)?.ctrlKey,
										altKey: (e.nativeEvent as any)?.altKey
									}

									if (!!props.children.props.onChange) {
										props.children.props.onChange(e as any)
									}
									if (!!props.changeValue) {
										props.changeValue(
											newState.value as V,
											!newState.name ? undefined : newState.name,
											newState?.shiftKey,
											newState?.ctrlKey,
											newState?.altKey
										)
									}
									if (!!props.setChanges && !!props.children.props.name) {
										props.setChanges(prevState => ({
											...prevState,
											[props.children.props.name as any]: newState.value as V
										}))
									}
									if (!!props.changeValueLate) {
										if (isValid) {
											lateState.current = newState
										}
										lateTrigger.current = setTimeout(() => {
											if (
												!!props.changeValueLate &&
												isMounted.current &&
												lateState.current !== undefined &&
												lateState.current.value !== props.children.props.value
											) {
												props.changeValueLate(
													lateState.current.value as V,
													!lateState.current.name ? undefined : lateState.current.name,
													lateState.current?.shiftKey,
													lateState.current?.ctrlKey,
													lateState.current?.altKey
												)
												lateState.current = undefined
											}
										}, props.lateDelayMS ?? 500)
										if (!props.children.props.onChange && !props.changeValue) { // && !props.changeValueLate
											if (verbose) {
												console.info('oC Val ISV?', !!props.internalStateValue, eTargetValue)
												if (!!props.internalStateValue)
													console.info('oC Val ISV', props.internalStateValue(eTargetValue, e))
											}
											setInternalState(
												!!props.internalStateValue ? props.internalStateValue(eTargetValue, e) : eTargetValue
											)
										}
									} else if (!!props.setChangesLate) {
										if (isValid) {
											lateState.current = newState
										}
										lateTrigger.current = setTimeout(() => {
											if (
												!!props.setChangesLate &&
												isMounted.current &&
												lateState.current !== undefined &&
												lateState.current.value !== props.children.props.value
											) {
												props.setChangesLate(prevState => ({
													...prevState,
													[props.children.props.name as any]: newState.value as V
												}))
												lateState.current = undefined
											}
										}, props.lateDelayMS ?? 500)
										if (!props.children.props.onChange && !props.changeValue) { // && !props.changeValueLate
											if (verbose) {
												console.info('oC Val ISV?', !!props.internalStateValue, eTargetValue)
												if (!!props.internalStateValue)
													console.info('oC Val ISV', props.internalStateValue(eTargetValue, e))
											}
											setInternalState(
												!!props.internalStateValue ? props.internalStateValue(eTargetValue, e) : eTargetValue
											)
										}
									} else {
										if (verbose) {
											console.info('Else Val ISV?', !!props.internalStateValue, eTargetValue)
											if (!!props.internalStateValue)
												console.info('Else Val ISV', props.internalStateValue(eTargetValue, e))
										}
										setInternalState(
											!!props.internalStateValue ? props.internalStateValue(eTargetValue, e) : eTargetValue
										)
									}
								}
							},
							autoComplete: props.autoComplete ?? (props.autoCompleteOn ? 'on' : `AC_${props.children.props.name ?? '' as any}_${RandomString(5)}`),
							value: internalState
						})
					)}
				</InputGroupWrapper>
			)}
		</>
	)
}
