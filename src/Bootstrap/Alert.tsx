import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'
import {ClassNames} from '../Functions'

export interface IWAlertProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
	color?: string
	tag?: string | React.ReactType
	isOpen?: boolean
	toggle?: () => void
}

export const Alert = (props: IWAlertProps) => {
	const TagToUse = props.tag ?? ('div' as React.ReactType)
	
	let classes = props.className ?? ''
	classes += !!props.color ? ` alert-${props.color}` : ''
	classes +=
		' ' +
		ClassNames({
			alert: true,
			'alert-dismissible': !!props.toggle,
			'fade': true,
			'show': !!props.isOpen
		})
	
	return <TagToUse {...OmitProperty(props, 'tag', 'color', 'isOpen', 'toggle', 'className')}
	                 className={classes.trim()}
	                 onClick={() => {
		                 if (!!props.toggle) props.toggle()
	                 }
	                 } />
}
