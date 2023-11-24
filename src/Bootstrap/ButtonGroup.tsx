import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'

export interface IWButtonGroupProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
	key?: any
	vertical?: boolean
}

export const ButtonGroup = (props: IWButtonGroupProps) => {
	let classes = props.className ?? ''
	classes +=
		' btn-group' +
		(!!props.vertical ? '-vertical' : '')

	return <div {...OmitProperty(props, 'vertical', 'className')} className={classes.trim()} />
}
