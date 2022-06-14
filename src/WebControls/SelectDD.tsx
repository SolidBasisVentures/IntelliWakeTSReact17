import React, {useState, useEffect, ReactElement} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {IconProp} from '@fortawesome/fontawesome-svg-core'
import {ClassNames} from '../Functions'
import {Dropdown} from '../Bootstrap/Dropdown'
import {DropdownItem} from '../Bootstrap/DropdownItem'

export interface IPropsSelectDDItem {
	id: number | string | boolean | null
	name: string | ReactElement
	data?: any
	faIcon?: IconProp
	faIconColor?: string
}

export interface IPropsSelectDD {
	items: IPropsSelectDDItem[]
	faIcon?: any | undefined | null
	selectedID?: number | string | boolean | null | undefined
	handleSelectItem?: (item: any | null) => void
	handleSelectData?: (data: any | null) => void
	handleSelectID?: (id: any | null) => void
	color?: string
	size?: 'lg' | 'sm' | undefined
	caret?: boolean
	className?: string
	classNameBtn?: string
	inline?: boolean
	likeSelect?: boolean
	right?: boolean
}

export const SelectDD = (props: IPropsSelectDD) => {
	const [selectedItem, setSelectedItem] = useState(
		props.items.find((item: IPropsSelectDDItem) => props.selectedID === undefined || item.id === props.selectedID) ??
		undefined
	)

	const handleSelect = (item: any) => {
		setSelectedItem(item)
		if (!!props.handleSelectItem) {
			props.handleSelectItem(item)
		}
		if (!!props.handleSelectData) {
			props.handleSelectData(item?.data ?? null)
		}
		if (!!props.handleSelectID) {
			props.handleSelectID(item?.id ?? null)
		}
	}

	useEffect(() => {
		setSelectedItem(
			props.items.find((item: IPropsSelectDDItem) => props.selectedID === undefined || item.id === props.selectedID) ??
			undefined
		)
	}, [props.selectedID, props.items])

	return (
		<Dropdown
			size={props.size}
			className={
				(props.className ?? '') + (!!props.likeSelect ? ' input-dd' : '') + (!!props.inline ? ' d-inline-block' : '')
			}
			right={props.right}
			color={props.color ?? (!!props.inline ? 'primary-outline' : 'primary')}
			noCaret={!props.caret}
			buttonClassName={(!!props.classNameBtn ? props.classNameBtn : '') + ' ' + (!!props.inline ? ' btn-link-inline' : '')}
			buttonFAProps={props.faIcon}
			buttonLabel={(selectedItem ?? {}).name ?? 'No Selection'}
		>
			{(props ?? {}).items.map((item: IPropsSelectDDItem) => (
				<DropdownItem key={(item.id ?? -1).toString()} onClick={() => handleSelect(item)}>
					{item.faIcon && (
						<FontAwesomeIcon
							icon={item.faIcon}
							fixedWidth
							className={ClassNames({['text-' + item.faIconColor ?? '']: !!item.faIconColor})}
						/>
					)}
					{item.name}
				</DropdownItem>
			))}
		</Dropdown>
	)
}
