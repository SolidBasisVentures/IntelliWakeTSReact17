import React, {forwardRef, ReactNode} from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'

export interface IWButtonLightProps {
	title?: string
	size?: 'sm' | 'lg'
	block?: boolean
	color?: string
	outline?: boolean
	hidden?: boolean
	disabled?: boolean
	style?: React.CSSProperties
	className?: string
	onClick?: React.MouseEventHandler<HTMLButtonElement>
	children?: ReactNode
	to?: string
	active?: boolean
}

export interface IIWButtonProps extends IWButtonLightProps, Omit<React.HTMLProps<HTMLButtonElement>, 'size' | 'ref'> {
	tag?: string | React.ReactType
	// type?: 'button' | 'submit' | 'reset'
	autoFocus?: boolean
	// tabIndex?: number
	// innerRef?: MutableRefObject<HTMLButtonElement>
	// onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>
	// onKeyPress?: React.KeyboardEventHandler<HTMLButtonElement>
	// caret?: boolean
	classNameOverride?: string
}

export const Button = forwardRef<HTMLButtonElement, IIWButtonProps>((props, ref) => {
	const TagToUse = props.tag ?? ('button' as React.ReactType)

	return (
		<TagToUse
			className={
				props.classNameOverride ??
				(props.className ?? '') +
					` btn ` +
					(props.color === 'inline'
						? 'btn btn-link btn-link-inline '
						: `btn-${props.outline ? 'outline-' : ''}${props.color ?? 'secondary'} `) +
					(props.block
						? 'btn-block '
						: '') +
					(props.active
						? 'active '
						: '') +
					`${!!props.size ? `btn-${props.size}` : ''}` // +
				// ' ' +
				// ClassNames({'btn-block': !!props.block, caret: !!props.caret})
			}
			type={props.type ?? 'button'}
			{...OmitProperty(props, 'tag', 'size', 'block', 'autoFocus', 'classNameOverride', 'active', 'color', 'outline', 'className')}
			// onClick={props.onClick}
			// tabIndex={props.tabIndex}
			ref={ref}
			// to={props.to}
			// onKeyDown={props.onKeyDown}
			// onKeyPress={props.onKeyPress}
			// autoFocus={props.autoFocus}
			// hidden={props.hidden}
			// disabled={props.disabled}
			// style={props.style}
			// title={props.title}
			// children={props.children}
		/>
	)
})
