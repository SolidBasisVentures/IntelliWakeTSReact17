import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'
import {ClassNames} from '../Functions'

export interface IWCardColumnsProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
	tag?: string | React.ReactType
	fillHeight?: boolean
	fillHeightScroll?: boolean
}

export const CardColumns = (props: IWCardColumnsProps) => {
	const TagToUse = props.tag ?? ('div' as React.ReactType)
	
	return (
		<TagToUse {...OmitProperty(props, 'tag', 'className', 'fillHeight', 'fillHeightScroll')}
		          className={`card-columns ${props.className ?? ''} ${ClassNames({
			          'fill-height': !!props.fillHeight,
			          'fill-height-scroll': !!props.fillHeightScroll
		          })}`.trim()} />
	)
}
