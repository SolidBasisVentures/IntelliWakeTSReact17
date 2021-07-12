import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'

export interface IWBreadCrumbItemProps extends Omit<React.HTMLProps<HTMLLIElement>, 'ref'> {
	active?: boolean
}

export const BreadCrumbItem = (props: IWBreadCrumbItemProps) => {
	let classes = props.className ?? ''
	classes +=
		' breadcrumb-item'
		+ (props.active ? ' active' : '')
	
	return <li {...OmitProperty(props, 'className', 'active')} className={classes.trim()} />
}
