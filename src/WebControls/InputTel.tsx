import React, {useMemo} from 'react'
import {IconProp} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPhone} from '@fortawesome/pro-regular-svg-icons'
import {IIWInputProps, ReduceInputProps, ReduceToInputAddProps} from './IWInputProps'
import {FormatPhoneNumber, OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'
import {InputWrapper} from './InputWrapper'

interface IProps<T = unknown> extends IIWInputProps<T> {
	showFAIcon?: boolean | IconProp
}

export function InputTel<T>(props: IProps<T>) {
	const inputProps = useMemo(() => ReduceInputProps(OmitProperty(props, 'showFAIcon'), 'form-control')
, [props, props.value])

	const faIconToShow = useMemo((): null | IconProp => {
		if (!props.showFAIcon) return null

		if (props.showFAIcon === true) return faPhone

		return props.showFAIcon as IconProp
	}, [props.showFAIcon])

	return (
		<InputWrapper
			{...ReduceToInputAddProps(props)}
			className="inputTel"
			append={!!faIconToShow && <FontAwesomeIcon icon={faIconToShow} />}
			plainTextControl={FormatPhoneNumber(props.value as string)}>
			<input type="tel" inputMode="tel" {...inputProps} />
		</InputWrapper>
	)
}
