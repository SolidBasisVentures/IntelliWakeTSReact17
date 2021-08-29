import React, {forwardRef} from 'react'
import {ClassNames} from '../Functions'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'

export interface IIWTableProps extends Omit<React.HTMLProps<HTMLTableElement>, 'ref' | 'size'> {
	bordered?: boolean
	borderless?: boolean
	striped?: boolean
	hover?: boolean
	size?: 'sm' | 'lg'
	responsive?: boolean
	dark?: boolean
	caption?: string
	textSmall?: boolean
	legacySticky?: boolean
	sticky?: boolean
	sortable?: boolean
}

export const Table = forwardRef<HTMLTableElement, IIWTableProps>((props, ref) => {
	return (
		<table
			className={
				(props.className ?? '') +
				' ' +
				ClassNames({
					table: true,
					'table-bordered': !!props.bordered,
					'table-borderless': !!props.borderless,
					'table-striped': !!props.striped,
					'table-dark': !!props.dark,
					'table-hover': !!props.hover,
					'table-responsive': !!props.responsive,
					'table-sortable': !!props.sortable,
					'table-sm': props.size !== 'lg',
					small: !!props.textSmall,
					'table-sticky': !!props.sticky,
					'table-sticky-legacy': !!props.legacySticky
				})
			}
			ref={ref}
			{...OmitProperty(props,
				'bordered',
				'borderless',
				'striped',
				'hover',
				'size',
				'responsive',
				'dark',
				'caption',
				'textSmall',
				'sticky',
				'legacySticky',
				'sortable',
				'className'
			)}>
			{!!props.caption && <caption>{props.caption}</caption>}
			{props.children}
		</table>
	)
})
