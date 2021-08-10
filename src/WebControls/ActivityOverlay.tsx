import React from 'react'
import {Spinner} from './Spinner'
import {SizeProp} from '@fortawesome/fontawesome-svg-core'

export interface IActivityOverlayState {
	nestedCount: number
	lastStart: number | undefined
}

export const initialActivityOverlayState: IActivityOverlayState = {
	nestedCount: 0,
	lastStart: undefined
}

interface IProps {
	activityOverlayState: IActivityOverlayState
	resetActivityOverlay: () => void
	size?: SizeProp
}

export const AddActivityOverlay = (prevState: IActivityOverlayState): IActivityOverlayState => {
	return {
		nestedCount: prevState.nestedCount + 1,
		lastStart: Date.now()
	}
}

export const RemoveActivityOverlay = (prevState: IActivityOverlayState): IActivityOverlayState => {
	if (prevState.nestedCount < 1) {
		console.log('WARNING: Additional RemoveActivityOverlay called')
		return initialActivityOverlayState
	}

	return {
		nestedCount: prevState.nestedCount - 1,
		lastStart: Date.now()
	}
}

/**
 * An overlay with a black background and a spinner that covers the entire screen.
 */
export const ActivityOverlay = (props: IProps) => {
	function resetActivityOverlay() {
		if (props.activityOverlayState.nestedCount > 0) {
			const ms = 5000
			if (Date.now() - (props.activityOverlayState.lastStart ?? 0) >= ms) {
				props.resetActivityOverlay()
			}
		}
	}

	if (props.activityOverlayState.nestedCount > 0) {
		return (
			<div className="System_ActivityOverlay ActivityOverlay" onClick={resetActivityOverlay} color="primary">
				<Spinner size={props.size ?? '3x'} />
			</div>
		)
	}

	return null
}
