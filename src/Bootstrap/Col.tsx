import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'
import {ApplyColumnProp, IWColumnProps} from './ColProp'
import {ClassNames} from '../Functions'

export interface IIWColProps extends React.HTMLProps<HTMLDivElement> {
	xs?: IWColumnProps
	sm?: IWColumnProps
	md?: IWColumnProps
	lg?: IWColumnProps
	xl?: IWColumnProps
	fillHeight?: boolean
	fillHeightScroll?: boolean
}

export const Col = (props: IIWColProps) => {
	let classes = `${props.className ?? ''}`.trim()
	
	if (!props.xs && !props.sm && !props.md && !props.lg && !props.xl) {
		classes += ' col'
	}
	
	classes += ApplyColumnProp('xs', props.xs)
	classes += ApplyColumnProp('sm', props.sm)
	classes += ApplyColumnProp('md', props.md)
	classes += ApplyColumnProp('lg', props.lg)
	classes += ApplyColumnProp('xl', props.xl)
	
	return (
		<div {...OmitProperty(props, 'xs', 'sm', 'md', 'lg', 'xl', 'children', 'fillHeight', 'fillHeightScroll')}
		     className={`${classes.trim()} ${ClassNames({
			     'fill-height': !!props.fillHeight,
			     'fill-height-scroll': !!props.fillHeightScroll
		     })}`.trim()}>
			{props.children}
		</div>
	)
}
