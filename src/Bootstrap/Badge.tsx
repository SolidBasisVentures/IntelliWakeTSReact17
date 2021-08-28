import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'
import {ClassNames} from '../Functions'

export interface IWBadgeProps extends Omit<React.HTMLProps<HTMLSpanElement>, 'ref'> {
	color?: string
	notPill?: boolean
	tag?: string | React.ReactType
}

export const Badge = (props: IWBadgeProps) => {
	const TagToUse = props.tag ?? ('span' as React.ReactType)

	let classes = props.className ?? ''
	classes += !!props.color ? ` bg-${props.color}` : ''
	classes +=
		' ' +
		ClassNames({
			badge: true,
			'rounded-pill': !props.notPill
		})

	return <TagToUse {...OmitProperty(props, 'tag', 'color', 'notPill', 'className')} className={classes.trim()} />
}
