import React, {ReactNode, useCallback, useMemo} from 'react'
import {EvaluateString, TVariables} from '@solidbasisventures/intelliwaketsfoundation'
import {Button} from '../Bootstrap/Button'
import { Modal } from '../Bootstrap/Modal'
import { ModalHeader } from '../Bootstrap/ModalHeader'
import { ModalBody } from '../Bootstrap/ModalBody'
import { ModalFooter } from '../Bootstrap/ModalFooter'

export interface IModalPromptResponse {
	label: ReactNode
	action: () => void
	color?: string
	outline?: boolean
}

export type TModalPromptResponse = null | IModalPromptResponse | IModalPromptResponse[]

export interface IModalPromptProps {
	title?: ReactNode
	messageBody?: ReactNode
	variables?: TVariables
	color?: string
	okLabel?: ReactNode
	okAction?: () => void
	okKeys?: string[] | string
	promptResponses?: TModalPromptResponse
	cancelLabel?: ReactNode
	cancelColor?: string
	cancelOutline?: boolean
	cancelAction?: () => void
	dismiss?: (nullValue: null, canceled: boolean) => void
	hidden?: boolean
	promptOnly?: boolean
}

/**
 * A wrapper for Bootstrap's Modal that handles all the actions.
 *
 * @example
 * const [modalPromptProps, setModalPromptProps] = useState<null | IModalPromptProps>(null)
 *
 * setModalPromptProps({
 * 	title: 'Do action?',
 * 	color: 'danger',
 * 	messageBody: 'Are you sure you want to do the action?',
 * 	okLabel: 'Do',
 * 	okAction: () => {doAction()}
 * 	})
 *
 * <ModalPrompt {...modalPromptProps} dismiss={setModalPromptProps} />
 */
export const ModalPrompt = (props: IModalPromptProps) => {
	const promptResponsesAsArray = useMemo(() => {
		if (props.promptResponses === null || props.promptResponses === undefined) return [] as IModalPromptResponse[]

		if (props.promptResponses.constructor === Array) {
			return props.promptResponses as IModalPromptResponse[]
		} else {
			return [props.promptResponses] as IModalPromptResponse[]
		}
	}, [props.promptResponses])

	const title = useMemo(() => {
		if (typeof props.title !== 'string' || !props.variables) return props.title

		return EvaluateString(props.title, props.variables)
	}, [props.title, props.variables])

	const messageBody = useMemo(() => {
		if (typeof props.messageBody !== 'string' || !props.variables) return props.messageBody

		return EvaluateString(props.messageBody, props.variables)
	}, [props.messageBody, props.variables])

	const isOpen = useMemo(
		() =>
			(!!props.promptOnly ||
				(props.promptResponses !== null && props.promptResponses !== undefined) ||
				(!!props.okLabel && !!props.okAction)) &&
			!props.hidden,
		[props.title, props.messageBody, props.promptResponses, props.okLabel, props.okAction, props.hidden]
	)

	const dismiss = useCallback(
		(canceled: boolean) => {
			if (!!props.dismiss) props.dismiss(null, canceled)
			if (canceled && !!props.cancelAction) props.cancelAction()
		},
		[props.dismiss, props.cancelAction]
	)

	const okAction = () => {
		!!props.okAction && props.okAction()
		dismiss(false)
	}

	return (
		<Modal isOpen={isOpen} toggle={() => dismiss(true)} >
			<ModalHeader
				className={'alert-' + (props.color ?? 'primary')}>
				{title}
			</ModalHeader>
			{!!messageBody && <ModalBody>{messageBody}</ModalBody>}
			<ModalFooter>
				<Button
					type="button"
					onClick={() => dismiss(true)}
					outline={props.cancelOutline}
					color={
						props.cancelColor ??
						(promptResponsesAsArray.length === 0 && (!props.okLabel || !props.okAction)
							? props.color ?? 'primary'
							: 'link')
					}>
					{props.cancelLabel ??
						(promptResponsesAsArray.length === 0 && (!props.okLabel || !props.okAction) ? 'OK' : 'Cancel')}
				</Button>
				{promptResponsesAsArray.map((promptResponse, idx) => (
					<Button
						key={idx}
						onClick={() => {
							promptResponse.action()
							dismiss(false)
						}}
						outline={promptResponse.outline}
						color={promptResponse.color ?? props.color ?? 'primary'}
						className="ml-1">
						{promptResponse.label}
					</Button>
				))}
				{!!props.okLabel && !!props.okAction && (
					<Button
						onClick={okAction}
						color={props.color ?? 'primary'}
						className="ml-1"
						// onKeyPress={okKeyPress}
						autoFocus
						tabIndex={0}>
						{props.okLabel}
					</Button>
				)}
			</ModalFooter>
		</Modal>
	)
}
