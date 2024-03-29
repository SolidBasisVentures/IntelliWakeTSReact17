import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'

export interface IWModalFooterProps extends React.HTMLProps<HTMLDivElement> {
	key?: any
}

export const ModalFooter = (props: IWModalFooterProps) => {
	return <div {...OmitProperty(props, 'className')} className={'modal-footer ' + (props.className ?? '')} />
}
