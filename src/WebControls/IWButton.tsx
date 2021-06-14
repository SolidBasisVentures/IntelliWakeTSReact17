import React from 'react'
import {ClassNames} from '../Functions'

export interface IIWButtonProps {
	size?: 'sm' | 'lg'
	color?: string
	outline?: boolean
	hidden?: boolean
	disabled?: boolean
	block?: boolean
	style?: React.CSSProperties
	type?: 'button' | 'submit' | 'reset'
	autoFocus?: boolean
	className?: string
	onClick?: React.MouseEventHandler
	tabIndex?: number
	ref?: any
	children?: any
	onKeyDown?: React.KeyboardEventHandler
	onKeyPress?: React.KeyboardEventHandler
}

export const IWButton = (props: IIWButtonProps) => {
	return (
		<button className={(props.className ?? '') +
		` btn ` + (props.color === 'inline' ? 'btn btn-link btn-link-inline ' : `btn-${props.outline ? 'outline-' : ''}${props.color ?? 'secondary'} `) +
		`${!!props.size ? `btn-${props.size}` : ''}` + ' ' +
		ClassNames({'btn-block': !!props.block})}
		        type={props.type ?? 'button'}
		        onClick={props.onClick}
		        tabIndex={props.tabIndex}
		        ref={props.ref}
		        onKeyDown={props.onKeyDown}
		        onKeyPress={props.onKeyPress}
		        autoFocus={props.autoFocus}
		        hidden={props.hidden}
		        disabled={props.disabled}
		        style={props.style}>
			{props.children}
		</button>
	)
}
