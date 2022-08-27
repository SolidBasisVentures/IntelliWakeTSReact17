import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'

export interface IWModalHeaderProps extends React.HTMLProps<HTMLDivElement> {
	color?: string
}

export const ModalHeader = (props: IWModalHeaderProps) => {
	return (
		<div
			{...OmitProperty(props, 'className')}
			className={'modal-header alert rounded-0 ' + (!!props.color ? `alert-${props.color} ` : '') + (props.className ?? '')}
		/>
	)
}
