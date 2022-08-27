import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'

export interface IWCardHeaderProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
	tag?: string | React.ReactType
	color?: string
}

export const CardHeader = (props: IWCardHeaderProps) => {
	const TagToUse = props.tag ?? ('div' as React.ReactType)

	return (
		<TagToUse {...OmitProperty(props, 'tag', 'className', 'color')} className={`card-header ${!!props.color ? 'alert alert-' + props.color : ''} ${props.className ?? ''}`.trim()} />
	)
}
