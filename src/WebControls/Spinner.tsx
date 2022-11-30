import React from 'react'
import {FontAwesomeIcon, FontAwesomeIconProps} from '@fortawesome/react-fontawesome'
import {faSpinnerThird} from '@fortawesome/pro-solid-svg-icons/faSpinnerThird'

export interface IIWSpinnerProps extends Partial<FontAwesomeIconProps> {
	invisible?: boolean
}

export const Spinner = (props: IIWSpinnerProps) => {
	// let style: CSSProperties = {}
	//
	// if (!props.spin && !props.pulse) {
	// 	style.animation = 'fa-spin 0.75s infinite linear'
	// }

	const className = `liveSpinner${(!props.spin && !props.pulse) ? ' liveSpinnerSpin' : ''}${props.invisible ? ' invisible' : ''}`.trim()

	return <FontAwesomeIcon icon={faSpinnerThird} {...props} className={className} />
}
