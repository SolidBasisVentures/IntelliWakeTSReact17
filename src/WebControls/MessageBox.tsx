import React, {useCallback, useEffect, useRef} from 'react'
import {TextToHTML} from '@solidbasisventures/intelliwaketsfoundation'
import {Alert} from '../Bootstrap/Alert'

export interface MessageBoxState {
	message: string | null
	messageBody?: string | null
	color?: string
	noDismiss?: boolean
}

export const initialMessageBoxState: MessageBoxState = {
	message: null
}

interface IProps {
	messageBoxState: MessageBoxState | string,
	dismissMessageBox: (() => void)
}

/**
 * An alert box that appears when a message is passed as a prop,and dismisses after three seconds.
 */
export const MessageBox = (props: IProps) => {
	const lastMessage = useRef<any>()
	const lastMessageBody = useRef<any>()
	const propsMessageBoxState = typeof props.messageBoxState === 'string' ? {
		...initialMessageBoxState,
		message: props.messageBoxState
	} : props.messageBoxState
	
	const dismissTimeout = useRef(setTimeout(() => {
	}, 1))
	
	const dismissMessageBox = useCallback(props.dismissMessageBox, [props.dismissMessageBox])
	
	useEffect(() => {
		clearTimeout(dismissTimeout.current)
		if (!!propsMessageBoxState.message) {
			lastMessage.current = propsMessageBoxState.message
			lastMessageBody.current = TextToHTML(propsMessageBoxState.messageBody ?? '')
			if (!propsMessageBoxState.noDismiss) {
				dismissTimeout.current = setTimeout(dismissMessageBox, 3000)
			}
		}
	}, [propsMessageBoxState.message, propsMessageBoxState.noDismiss, dismissMessageBox])
	
	return (
		<Alert className='System_MessageBox' color={propsMessageBoxState.color ?? 'primary'}
		       isOpen={!!propsMessageBoxState.message} toggle={props.dismissMessageBox}>
			{lastMessage.current}
			{!!lastMessageBody.current &&
			<small>
				<hr />
				<span dangerouslySetInnerHTML={{__html: lastMessageBody.current}}>
                        </span>
			</small>
			}
		</Alert>
	)
}
