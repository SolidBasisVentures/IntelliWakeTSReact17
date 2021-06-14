import React from 'react'

export interface IIWButtonProps {
	size?: 'sm' | 'lg'
	color?: string
	outline?: boolean
	type?: 'button' | 'submit'
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
		<button className={(props.className ?? '') + ` btn btn-${props.outline ? 'outline-' : ''}${props.color ?? 'secondary'} `}
		        type={props.type ?? 'button'}
		        onClick={props.onClick}
		tabIndex={props.tabIndex}
		ref={props.ref}
		onKeyDown={props.onKeyDown}
		onKeyPress={props.onKeyPress}
		autoFocus={props.autoFocus}>
			{props.children}
		</button>
	)
}
