import React from 'react'
import {ClassNames} from '../Functions'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'

export interface IIWContainerProps extends React.HTMLProps<HTMLDivElement> {
	key?: any
	fluid?: boolean | string
	className?: string
	children?: any
	fillHeight?: boolean
	fillHeightScroll?: boolean
}

export const Container = (props: IIWContainerProps) => {
	return (
		<div
			{...OmitProperty(props, 'fluid', 'className', 'children', 'fillHeight', 'fillHeightScroll')}
			className={`${props.className ?? ''} ${ClassNames({
				container: !props.fluid,
				'container-fluid': !!props.fluid,
				'fill-height': !!props.fillHeight,
				'fill-height-scroll': !!props.fillHeightScroll
			})}`.trim()}>
			{props.children}
		</div>
	)
}
