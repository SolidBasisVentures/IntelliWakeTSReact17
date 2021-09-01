import {SizeProp} from '@fortawesome/fontawesome-svg-core'
import {faStar as faStarOn} from '@fortawesome/pro-solid-svg-icons'
import {faStar as faStarOff} from '@fortawesome/pro-regular-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {ButtonGroup} from '../Bootstrap/ButtonGroup'
import {Button} from '../Bootstrap/Button'

export interface IIWRatingStarsProps<T> {
	value: number | null
	name?: keyof T
	plainText?: boolean
	changeValue?: (value: any, name?: keyof T) => void
	size?: SizeProp
	buttonSize?: 'sm' | 'lg'
	allowNull?: boolean
}

export const InputRatingStars = <T,>(props: IIWRatingStarsProps<T>) => {
	const isMouseDown = useRef(false)
	const starValues = useMemo(() => [1, 2, 3, 4, 5], [])
	const [localValue, setLocalValue] = useState<number | null>(props.value)

	useEffect(() => setLocalValue(props.value), [props.value])

	const editable = !props.plainText && !!props.changeValue

	const globalMouseUp = useCallback(() => {
		isMouseDown.current = false
	}, [])

	useEffect(() => {
		document.addEventListener('mouseup', globalMouseUp)

		return () => {
			document.removeEventListener('mouseup', globalMouseUp)
		}
	}, [globalMouseUp])

	const mouseEventValue = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>, value: number): number | null => {
			if (value === 1 && props.allowNull) {
				const bounding = e.currentTarget.getBoundingClientRect()
				if (e.clientX - bounding.x < bounding.width / 2) return null
			}

			return value
		},
		[props.allowNull]
	)

	const mouseEvent = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>, value: number) => {
			if (isMouseDown.current && editable) {
				const newValue = mouseEventValue(e, value)
				if (localValue !== newValue) setLocalValue(newValue)
			}
		},
		[editable, localValue, mouseEventValue]
	)
	
	const iconSize = useMemo<SizeProp>(() => props.size ?? 'lg', [props.size])
	
	const buttonSize = useMemo<'sm' | 'lg'>(() => props.buttonSize ?? (['xs', 'sm', '1x'] as SizeProp[]).includes(iconSize) ? 'sm' : 'lg', [iconSize, props.buttonSize])

	return (
		<ButtonGroup
			onMouseLeave={() => {
				if (isMouseDown.current && localValue !== props.value) {
					setLocalValue(props.value)
				}
			}}>
			{starValues.map(starValue => (
				<Button
					color="link"
					className="px-1 py-0"
					key={starValue}
					onMouseDown={e => {
						isMouseDown.current = true
						mouseEvent(e, starValue)
					}}
					size={buttonSize}
					onMouseMove={e => mouseEvent(e, starValue)}
					onMouseUp={e => {
						if (props.changeValue) {
							const newValue = mouseEventValue(e, starValue)
							if (props.value !== newValue) props.changeValue(newValue, props.name)
						}
					}}>
					<FontAwesomeIcon
						icon={!!localValue && starValue <= localValue ? faStarOn : faStarOff}
						style={{color: !!localValue && starValue <= localValue ? 'gold' : 'gray'}}
						size={iconSize}
					/>
				</Button>
			))}
		</ButtonGroup>
	)
}
