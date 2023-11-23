import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'
import {ClassNames} from '../Functions'

export interface IWButtonToolbarProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {}

export const ButtonToolbar = (props: IWButtonToolbarProps) => {
	key?: any
	let classes = props.className ?? ''
	classes +=
		' ' +
		ClassNames({
			'btn-toolbar': true
		})

	return <div {...OmitProperty(props, 'className')} className={classes.trim()} />
}
