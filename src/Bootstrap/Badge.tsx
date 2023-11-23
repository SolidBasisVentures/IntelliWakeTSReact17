import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'
import {ClassNames} from '../Functions'

export interface IWBadgeProps extends Omit<React.HTMLProps<HTMLSpanElement>, 'ref'> {
	key?: any
	color?: string
	notPill?: boolean
	tag?: string | React.ReactType
}

export const Badge = (props: IWBadgeProps) => {
	const TagToUse = props.tag ?? ('span' as React.ReactType)

	return <TagToUse {...OmitProperty(props, 'tag', 'color', 'notPill', 'className')}
	                 className={`${props.className ?? ''} ${!!props.color ? ` bg-${props.color}` : ''} ${ClassNames({
		                 badge: true,
		                 'rounded-pill': !props.notPill
	                 })}`.trim()} />
}
