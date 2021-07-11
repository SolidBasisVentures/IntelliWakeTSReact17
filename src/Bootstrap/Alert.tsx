import React, {useEffect, useRef, useState} from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'
import {ClassNames} from '../Functions'

export interface IWAlertProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
	color?: string
	tag?: string | React.ReactType
	isOpen?: boolean
	toggle?: () => void
}

export const Alert = (props: IWAlertProps) => {
	const TagToUse = props.tag ?? ('div' as React.ReactType)
	const clearTime = useRef(setTimeout(() => {
	}, 100))
	const isMounted = useRef(false)
	const [showState, setShowState] = useState<IWAlertProps | null>(null)
	
	let classes = showState?.className ?? ''
	classes += !!showState?.color ? ` alert-${showState?.color}` : ''
	classes +=
		' ' +
		ClassNames({
			alert: true,
			'alert-dismissible': !!props.toggle,
			'cursor-pointer': !!props.toggle,
			'fade': true,
			'show': !!props.isOpen
		})
	
	useEffect(() => {
		isMounted.current = true
		if (!!props.isOpen) {
			setShowState(props)
		} else {
			if (showState?.isOpen) {
				clearTimeout(clearTime.current)
				clearTime.current = setTimeout(() => {
					if (isMounted.current) {
						setShowState(null)
					}
				}, 1500)
			}
		}
		
		return () => {
			isMounted.current = false
		}
	}, [props.isOpen])
	
	return <TagToUse {...OmitProperty(props, 'tag', 'color', 'isOpen', 'toggle', 'className')}
	                 className={classes.trim()}
	                 onClick={() => {
		                 if (!!props.toggle) props.toggle()
	                 }
	                 } />
}
