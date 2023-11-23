import React from 'react'
import {ClassNames} from '../Functions'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'

export interface IIWRowProps extends React.HTMLProps<HTMLDivElement> {
	key?: any
	noGutters?: boolean
	className?: string
	children?: any
	fillHeight?: boolean
	fillHeightScroll?: boolean
}

export const Row = (props: IIWRowProps) => {
	return (
		<div
			{...OmitProperty(props, 'noGutters', 'className', 'children', 'fillHeight', 'fillHeightScroll')}
			className={`${props.className ?? ''} ${ClassNames({
				row: true,
				'no-gutters': !!props.noGutters,
				'fill-height': !!props.fillHeight,
				'fill-height-scroll': !!props.fillHeightScroll
			})}`.trim()}>
			{props.children}
		</div>
	)
}
