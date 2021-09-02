import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'
import {ClassNames} from '../Functions'
import {Spinner} from '../WebControls/Spinner'
import {EllipsesTruncate} from '../WebControls/EllipsesTruncate'

export interface IWDropdownItemProps extends Omit<React.HTMLProps<HTMLBaseElement>, 'ref'> {
	disabled?: boolean
	tag?: string | React.ReactType
	href?: string
	divider?: boolean
	header?: boolean
	loading?: boolean
	active?: boolean
	maxWidth?: string
}

export const DropdownItem = (props: IWDropdownItemProps) => {
	const TagToUse = props.tag ?? (!!props.href ? ('a' as React.ReactType) : ('div' as React.ReactType))

	let classes = props.className ?? ''
	classes +=
		' ' +
		ClassNames({
			'dropdown-item': !props.header && !props.divider,
			'dropdown-header': !!props.header,
			'dropdown-divider': !!props.divider,
			'active': !!props.active,
			disabled: !!props.disabled
		})

	return (
		<TagToUse
			{...OmitProperty(
				props,
				'tag',
				'disabled',
				'divider',
				'header',
				'active',
				'className',
				'size',
				'type',
				'children',
				'loading',
				'maxWidth'
			)}
			className={classes}
			style={{cursor: !props.disabled && (!!props.href || !!props.onClick) ? 'pointer' : undefined, maxWidth: props.maxWidth}}>
			<EllipsesTruncate text={props.children ??
				(!!props.loading && (
					<i className="text-muted">
						<Spinner fixedWidth /> Loading...
					</i>
				))} noTruncate={!props.maxWidth}/>
		</TagToUse>
	)
}
