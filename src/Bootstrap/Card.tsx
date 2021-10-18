import React, {forwardRef} from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'
import {ClassNames} from '../Functions'

export interface IWCardProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
	tag?: string | React.ReactType
	fillHeight?: boolean
	fillHeightScroll?: boolean
}

export const Card = forwardRef<HTMLDivElement, IWCardProps>((props, ref) => {
	const TagToUse = props.tag ?? ('div' as React.ReactType)
	
	return <TagToUse {...OmitProperty(props, 'tag', 'className', 'fillHeight', 'fillHeightScroll')}
	                 className={`${props.className ?? ''} card ${ClassNames({
		                 'fill-height': !!props.fillHeight,
		                 'fill-height-scroll': !!props.fillHeightScroll
	                 })}`.trim()} ref={ref} />
})
