import React, {CSSProperties, Fragment, ReactNode, useEffect, useMemo, useRef, useState} from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'
import {Button} from './Button'
import {ClassNames, KEY_ESCAPE} from '../Functions'
import {FontAwesomeIcon, FontAwesomeIconProps} from '@fortawesome/react-fontawesome'
import {faCog} from '@fortawesome/pro-regular-svg-icons'
import {DropdownItem} from './DropdownItem'
import {EllipsesTruncate} from '../WebControls/EllipsesTruncate'
import {IconProp} from '@fortawesome/fontawesome-svg-core'

export type Direction = 'up' | 'down' | 'left' | 'right'

export interface IDDAction {
	hidden?: boolean
	divider?: boolean
	disabled?: boolean
	header?: boolean
	headerGroup?: ReactNode
	faProps?: FontAwesomeIconProps
	faPropHidden?: boolean
	active?: boolean
	title?: ReactNode
	action?: () => void
	color?: string
	className?: string
	noClose?: boolean
}

export interface IWDropdownProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref' | 'size'> {
	disabled?: boolean
	direction?: Direction
	isOpen?: boolean
	nav?: boolean
	tag?: string | React.ReactType
	toggle?: React.KeyboardEventHandler<any> | React.MouseEventHandler<any>
	size?: 'sm' | 'lg'
	color?: string
	outline?: boolean
	block?: boolean
	inNavbar?: boolean
	right?: boolean
	buttonLabel?: ReactNode
	buttonFAProps?: FontAwesomeIconProps
	buttonClassName?: string
	menuClassName?: string
	noCaret?: boolean
	menuStyle?: CSSProperties
	maxWidth?: string
	maxHeight?: string
	maxWidthAction?: string | false
	allowWrap?: boolean
	ddActions?: IDDAction[] | (() => IDDAction[])
}

export const Dropdown = (props: IWDropdownProps) => {
	const hasOpened = useRef(false)
	const [isOpen, setIsOpen] = useState<boolean>(props.isOpen ?? false)

	interface IHeaderGroup {
		headerGroup: ReactNode | undefined
		ddActions: IDDAction[]
	}

	const visibleHeaderGroups = useMemo<IHeaderGroup[]>(
			() =>
					!props.ddActions ? [] : (typeof props.ddActions === 'function' ? props.ddActions() : props.ddActions).filter(
							(ddAction) => !ddAction.hidden).reduce<IHeaderGroup[]>((result, ddAction) => {
						let nextHeaderGroup = result.find(hG => hG.headerGroup === ddAction.headerGroup) ?? {
							headerGroup: ddAction.headerGroup,
							ddActions: []
						}

						nextHeaderGroup.ddActions = [...nextHeaderGroup.ddActions, ddAction]

						return [...result.filter(res => res.headerGroup !== nextHeaderGroup.headerGroup), nextHeaderGroup]
					}, [] as IHeaderGroup[]),
			[props.ddActions]
	)

	const showFAProps = useMemo(() => visibleHeaderGroups.some((hg) => hg.ddActions.some(ddAction => !!ddAction.faProps)), [visibleHeaderGroups])

	const TagToUse = props.tag ?? !!props.inNavbar ? 'li' : ('div' as React.ReactType)

	const isControlled = props.isOpen !== undefined

	const actualIsOpen = isControlled ? !!props.isOpen : isOpen

	const externalClick = (e: any) => {
		if (actualIsOpen) {
			e.stopPropagation()

			if (!!props.toggle) {
				props.toggle(e)
			}

			if (!isControlled) {
				setIsOpen(false)
			}
		}
	}

	const externalEsc = (e: any) => {
		if (e.keyCode === KEY_ESCAPE && actualIsOpen) {
			e.stopPropagation()

			if (!!props.toggle) {
				props.toggle(e)
			}

			if (!isControlled) {
				setIsOpen(false)
			}
		}
	}

	useEffect(() => {
		window.addEventListener('click', externalClick)
		window.addEventListener('keydown', externalEsc)
		return () => {
			window.removeEventListener('click', externalClick)
			window.removeEventListener('keydown', externalEsc)
		}
	})

	let classes = props.className ?? ''
	if (!!props.direction) classes += ` drop${props.direction}`
	classes +=
			' ' +
			ClassNames({
				dropdown: true,
				show: actualIsOpen,
				'd-inline-block': !props.block && !props.hidden,
				'navbar-nav': !!props.inNavbar,
				'nav-item': !!props.nav
			})

	if (actualIsOpen) hasOpened.current = true

	const buttonStyle = useMemo<React.CSSProperties>(() => {
		let items: React.CSSProperties = {}

		if (!!props.nav || !!props.inNavbar) {
			items.background = 'none'
			items.border = 'none'
		}

		if (!!props.maxWidth) items.maxWidth = props.maxWidth

		return items
	}, [])

	const dropdownMenuStyle = useMemo<React.CSSProperties>(() => {
		const style: React.CSSProperties = props.menuStyle ?? {maxHeight: props.maxHeight ?? '80vh'}

		if (props.maxWidthAction) style.maxWidth = props.maxWidthAction

		return style
	}, [])

	if (!props.children && visibleHeaderGroups.length === 0) return null

	return (
			<TagToUse
					{...OmitProperty(
							props,
							'tag',
							'disabled',
							'direction',
							'ddActions',
							'block',
							'isOpen',
							'nav',
							'toggle',
							'inNavbar',
							'right',
							'buttonLabel',
							'buttonFAProps',
							'buttonClassName',
							'menuClassName',
							'noCaret',
							'size',
							'color',
							'outline',
							'className',
							'menuStyle',
							'maxWidth',
							'maxHeight',
							'maxWidthAction'
					)}
					className={classes}>
				<Button
						color={props.color ?? (!!props.ddActions && !props.nav && !props.inNavbar ? 'secondary' : undefined)}
						block={props.block}
						size={props.size}
						outline={props.outline}
						disabled={props.disabled}
						className={(props.allowWrap ? '' : 'text-nowrap ') +
								(!!props.nav || !!props.inNavbar
										? undefined
										: `${props.buttonClassName ?? ''} ${!!props.noCaret ? '' : 'dropdown-toggle'}`.trim())
						}
						classNameOverride={
							!!props.nav || !!props.inNavbar
									? `text-start nav-link ${props.buttonClassName ?? ''} ${!!props.noCaret ? '' : 'dropdown-toggle'}`.trim()
									: undefined
						}
						onClick={(e: any) => {
							// e.stopPropagation()

							if (!!props.toggle) {
								props.toggle(e)
							}

							if (!isControlled) {
								setIsOpen((prevState) => !prevState)
							}
						}}
						style={buttonStyle}
						// ref={buttonRef}
				>
					{!!props.maxWidth ?
							<EllipsesTruncate
									text={props.buttonLabel ?? <FontAwesomeIcon icon={faCog as IconProp} />} />
							: (props.buttonLabel ?? <FontAwesomeIcon icon={faCog as IconProp} />)
					}
				</Button>
				<div
						tabIndex={-1}
						className={`${ClassNames({
							show: actualIsOpen,
							'dropdown-menu-end': !!props.right
						})} dropdown-menu ${props.menuClassName ?? ''}`.trim()}
						onClick={(e: any) => {
							e.stopPropagation()

							if (!!props.toggle) {
								props.toggle(e)
							}

							if (!isControlled) {
								setIsOpen((prevState) => !prevState)
							}
						}}
						style={dropdownMenuStyle}
				>
					{hasOpened.current && (
							<>
								{props.children}
								{visibleHeaderGroups.map((headerGroup, hg_idx) => (
										<Fragment key={`${hg_idx}-${headerGroup.headerGroup ?? 'NULL'}`}>
											{!!headerGroup.headerGroup &&
													<DropdownItem header>{headerGroup.headerGroup}</DropdownItem>}
											{headerGroup.ddActions.map((ddAction, dd_idx) => (
													<DropdownItem
															className={(ddAction.className ?? '') + (!!ddAction.color ? ` text-${ddAction.color}` : '')}
															key={`${hg_idx}-${headerGroup.headerGroup ?? 'NULL'}-${dd_idx}-${ddAction.title}`}
															active={ddAction.active}
															disabled={!!ddAction.disabled || !ddAction.action}
															divider={!!ddAction.divider}
															header={!!ddAction.header}
															onClick={e => {
																if (!!ddAction.noClose) e.stopPropagation()

																if (!!ddAction.action) ddAction.action()
															}}>
														{showFAProps && (
																<FontAwesomeIcon
																		icon={faCog as IconProp}
																		{...ddAction.faProps}
																		className={!ddAction.faProps || ddAction.faPropHidden ? 'invisible' : ''}
																		fixedWidth
																/>
														)}
														{ddAction.title}
													</DropdownItem>
											))}
										</Fragment>
								))}
							</>
					)}
				</div>
			</TagToUse>
	)
}
