import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'

export interface IWModalBodyProps extends React.HTMLProps<HTMLDivElement> {
	key?: any
}

export const ModalBody = (props: IWModalBodyProps) => {
	return <div {...OmitProperty(props, 'className')} className={'modal-body ' + (props.className ?? '')} />
}
