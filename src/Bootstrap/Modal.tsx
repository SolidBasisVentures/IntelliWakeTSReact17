import React, {CSSProperties, ReactNode, useCallback, useEffect, useMemo, useRef} from 'react'
import {KEY_ENTER, KEY_ESCAPE} from '../Functions'
import Portal from './Portal'
import {Form} from './Form'
import {Button, IWButtonLightProps} from './Button'
import {NowISOString} from '@solidbasisventures/intelliwaketsfoundation'

export interface IWModalProps {
	isOpen?: boolean
	// autoFocus?: boolean
	autoFocusElement?: any
	size?: 'sm' | 'lg' | 'xl'
	toggle?: React.KeyboardEventHandler<any> | React.MouseEventHandler<any>
	color?: string
	title?: ReactNode
	body?: ReactNode
	dialogStyle?: CSSProperties
	dialogClassName?: string
	contentStyle?: CSSProperties
	bodyStyle?: CSSProperties
	bodyClassName?: string
	bodyContainerFormSubmit?: boolean | string
	noCancel?: boolean
	cancelLabel?: ReactNode
	noCancelButton?: boolean
	okAction?: () => void | false
	okActionNotOnEnter?: boolean
	okLabel?: ReactNode
	okDisabled?: boolean
	footerLeft?: ReactNode
	footerRight?: ReactNode
	leftButtons?: IWButtonLightProps[]
	rightButtons?: IWButtonLightProps[]
	children?: any
	noOverFlowScroll?: boolean
}

export const Modal = (props: IWModalProps) => {
	const okButtonRef = useRef<HTMLButtonElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)
	
	const toggle = useCallback(
		(e: any) => {
			if (!!props.toggle && !props.noCancel) {
				props.toggle(e)
			}
		},
		[props]
	)
	
	const okAction = useCallback(
		(e: any) => {
			if (!!props.okAction) {
				const okResult = props.okAction()
				if (okResult === undefined || okResult) {
					if (!!props.toggle) {
						props.toggle(e)
					}
				}
			}
		},
		[props]
	)
	
	const keyDown = (e: any) => {
		if (props.isOpen) {
			e.stopPropagation()
			
			switch (e.keyCode) {
				case KEY_ESCAPE:
					toggle(e)
					break
				case KEY_ENTER:
					if (!props.okActionNotOnEnter) {
						okAction(e)
					}
					break
			}
		}
	}
	
	useEffect(() => {
		window.addEventListener('keydown', keyDown)
		return () => {
			window.removeEventListener('keydown', keyDown)
		}
	})
	
	useEffect(() => {
		if (props.isOpen) {
			if (!!props.autoFocusElement?.current) {
				props.autoFocusElement.current.focus()
			} else {
				if (!!contentRef.current) {
					let firstAutofocus = contentRef.current.querySelector('[autofocus]')
					if (!firstAutofocus) {
						firstAutofocus = contentRef.current.querySelector('.inputAutoFocus')
					}
					if (!!firstAutofocus) {
						(firstAutofocus as any).focus()
						return
					}
				}
				if (okButtonRef?.current) {
					okButtonRef.current.focus()
				}
			}
		}
	}, [props.isOpen, props.autoFocusElement])
	
	const showOK = useMemo(() => !!props.okAction && props.okLabel !== null && props.okLabel !== false && props.okLabel !== '',
		[!!props.okAction, props.okLabel])
	
	return (
		<Portal>
			<div
				className={'modal fade' + (props.isOpen ? ' show' : '')}
				role='dialog'
				style={{
					display: props.isOpen ? 'block' : 'none',
					pointerEvents: props.isOpen ? undefined : 'none'
				}}
				onMouseDown={e => {
					if (props.isOpen) {
						e.stopPropagation()
						
						toggle(e)
					}
				}}
				onKeyDown={keyDown}>
				<div
					className={
						('modal-dialog' +
							(!props.size ? ' ' : ` modal-${props.size} `) +
							(props.dialogClassName ?? '')).trim()
					}
					role='document'
					style={props.dialogStyle}>
					<div className='modal-content'
					     onMouseDown={e => e.stopPropagation()}
					     onClick={e => e.stopPropagation()}
					     style={props.contentStyle}
					     ref={contentRef}>
						{props.title !== undefined ? (
							<>
								{!!props.title && (
									<div className={`alert-${props.color ?? 'primary'} modal-header`}>
										<h5 className='modal-title'>{props.title}</h5>
										{!props.noCancel && (
											<button className='btn-close' onClick={toggle} />
										)}
									</div>
								)}
								<div
									className={`modal-body${!!props.noOverFlowScroll ? ' no-overflow-scroll overflow-hidden container container-fluid fill-height' : ' m-4 p-0'} ${props.bodyClassName ?? ''}`.trim()}
									style={props.bodyStyle}>
									{!!props.bodyContainerFormSubmit ? (
										<Form
											className={`container ${
												typeof props.bodyContainerFormSubmit === 'string' ? props.bodyContainerFormSubmit : ''
											}`.trim()}
											onSubmitCapture={(e) => {
												e.preventDefault()
												if (!props.okDisabled) {
													okAction(e)
												}
											}}
											onKeyDown={(e) => {
												if (e.keyCode === KEY_ENTER) {
													e.stopPropagation()
												}
											}}>
											{props.body}
											{props.children}
											<Button className='d-none' type='submit' />
										</Form>
									) : (
										<>
											{props.body}
											{props.children}
										</>
									)}
								</div>
								{(showOK || !props.noCancelButton || !!props.footerLeft || !!props.footerRight) && (
									<div className='modal-footer'>
										<div className='me-auto'>
											{(!props.noCancel || !props.noCancelButton) && (
												<button className='btn btn-link me-1 ' type='button' onClick={toggle}>
													{props.cancelLabel ?? 'Cancel'}
												</button>
											)}
											{(props.leftButtons ?? []).map((leftButton, idx) => (
												<Button key={idx + NowISOString()} {...leftButton}
												        className={(leftButton.className ?? '') + ' ' + 'me-1'} />
											))}
											{props.footerLeft}
										</div>
										<div className='text-end'>
											{props.footerRight}
											{(props.rightButtons ?? []).map((rightButton, idx) => (
												<Button key={idx + NowISOString()} {...rightButton}
												        className={(rightButton.className ?? '') + ' ' + 'ms-1'} />
											))}
											{showOK && (
												<button
													className={`ms-1 btn btn-${props.color ?? 'primary'}`}
													type='button'
													disabled={props.okDisabled}
													onClick={(e) => {
														e.stopPropagation()
														okAction(e)
													}}
													ref={okButtonRef}>
													{props.okLabel ?? 'OK'}
												</button>
											)}
										</div>
									</div>
								)}
							</>
						) : (
							props.children
						)}
					</div>
				</div>
			</div>
			<div
				className={'modal-backdrop fade' + (props.isOpen ? ' show' : '')}
				style={{pointerEvents: props.isOpen ? undefined : 'none'}}
				onClick={toggle}
			/>
		</Portal>
	)
}
