import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'

export interface IWBreadCrumbProps extends Omit<React.HTMLProps<HTMLOListElement>, 'ref'> {
	key?: any
	classNameLI?: string
}

export const BreadCrumb = (props: IWBreadCrumbProps) => {
	let classes = props.className ?? ''
	classes +=
		' breadcrumb'

	let classesLI = props.classNameLI ?? ''
	classesLI +=
		' breadcrumb'

	return <nav {...OmitProperty(props, 'classNameLI', 'className', 'children')} className={classes.trim()}>
		<ol className={classesLI.trim()} children={props.children} />
	</nav>
}
