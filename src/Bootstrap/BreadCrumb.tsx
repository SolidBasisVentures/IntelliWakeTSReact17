import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'

export interface IWBreadCrumbProps extends Omit<React.HTMLProps<HTMLOListElement>, 'ref'> {
	classNameLI?: string
}

export const BreadCrumb = (props: IWBreadCrumbProps) => {
	let classes = props.className ?? ''
	classes +=
		' breadcrumb'
	
	let classesLI = props.classNameLI ?? ''
	classes +=
		' breadcrumb'
	
	return <nav {...OmitProperty(props, 'classNameLI', 'className', 'children')} className={classes.trim()}>
		<li className={classesLI.trim()} children={props.children} />
	</nav>
}
