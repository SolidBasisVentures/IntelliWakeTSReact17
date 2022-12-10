import React from 'react'
import {FontAwesomeIcon, FontAwesomeIconProps} from '@fortawesome/react-fontawesome'
import {faSpinnerThird} from '@fortawesome/pro-solid-svg-icons/faSpinnerThird'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'
import {IconProp} from '@fortawesome/fontawesome-svg-core'

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

	return <FontAwesomeIcon icon={faSpinnerThird as IconProp} {...OmitProperty(props, 'invisible')} className={className} />
}
