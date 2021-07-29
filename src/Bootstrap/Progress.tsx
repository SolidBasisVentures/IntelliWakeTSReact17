import React, {ReactNode} from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'

export interface IIWProgressBar {
	minAmount?: number
	maxAmount?: number
	nowAmount: number
	striped?: boolean
	animated?: boolean
	color?: string
	children?: ReactNode
}

export interface IIWProgressProps extends IIWProgressBar, React.HTMLProps<HTMLDivElement> {
	height?: string
	hidden?: boolean
	otherBars?: IIWProgressBar[]
}

export const Progress = (props: IIWProgressProps) => {
	let classes = `progress ${props.className ?? ''}`.trim()
	
	const progressBarProps = (bar: IIWProgressBar): React.HTMLProps<HTMLDivElement> => {
		const spread = (bar.maxAmount ?? 100) - (bar.minAmount ?? 0)
		const percentAmount = !spread ? bar.nowAmount : (bar.nowAmount - (bar.minAmount ?? 0)) / (spread)
		
		return {
			className: `progress-bar${!!bar.color ? ` bg-${bar.color}` : ''}${bar.striped ? ' progress-bar-striped' : ''}${bar.striped ? ' progress-bar-animated' : ''}`.trim(),
			role: 'progressbar',
			style: {width: `${percentAmount}%`},
			'aria-valuenow': bar.nowAmount,
			'aria-valuemin': bar.minAmount ?? 0,
			'aria-valuemax': bar.maxAmount ?? 100,
			children: bar.children
		}
	}
	
	return <div {...OmitProperty(props, 'nowAmount', 'minAmount', 'maxAmount', 'striped', 'color', 'otherBars', 'height', 'style', 'className', 'children')}
	            className={classes.trim()}
	            style={{height: props.height, ...(props.style ?? {})}}>
		<div {...progressBarProps(props)} />
		{(props.otherBars ?? []).map((otherBar, idx) => <div
			key={otherBar.nowAmount + '-' + idx} {...progressBarProps(otherBar)} />)}
	</div>
}
