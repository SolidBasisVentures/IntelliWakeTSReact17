import {FontAwesomeIcon, FontAwesomeIconProps} from '@fortawesome/react-fontawesome'
import React, {Dispatch, ReactNode, SetStateAction, useMemo} from 'react'
import {IMasterDetailProps, MasterDetail, MDDetail, MDLink, MDMaster} from './MasterDetail'
import {ToDigits, ToPascalCase} from '@solidbasisventures/intelliwaketsfoundation'
import {ClassNames} from '../Functions'
import {ListGroupItem, TBadgeValues} from '../Bootstrap/ListGroupItem'
import {BadgeItem} from '../Bootstrap/BadgeItem'
import {ListGroup} from '../Bootstrap/ListGroup'
import {ListGroupItemHeading} from '../Bootstrap/ListGroupItemHeading'
import {Badge} from '../Bootstrap/Badge'
import {Spinner} from './Spinner'

export interface IMasterDetailListGroupMDLink {
	hidden?: boolean
	faProps?: FontAwesomeIconProps
	color?: string
	linkNode: ReactNode
	linkKey?: string
	linkClick?: React.MouseEventHandler<any>
	/** undefined = don't show, null = show with spinner, number (0, 1, etc.) = show */
	counter?: number | null
	counterColor?: string
	badge?: TBadgeValues
	badgeColor?: string
	panelTitle?: string
	panelURL?: string
	id?: any
	mdDetail?: ReactNode
	section?: string
	sectionNode?: ReactNode
	className?: string
	plainText?: boolean
}

export interface IMasterDetailListGroupDetail {
	panelTitle: string
	panelURL?: string
	mdDetail: ReactNode
}

export interface IMasterDetailListGroupProps extends Omit<IMasterDetailProps, 'children'> {
	mdMasterWidth?: string
	mdMasterClassName?: string
	mdMasterTopNode?: ReactNode
	mdMasterBottomNode?: ReactNode
	mdMasterBottomOutsideNode?: ReactNode
	sectionBreak?: 'Title' | 'HR' | 'Gap'
	listGroupItems: IMasterDetailListGroupMDLink[]
	collapsedSections?: string[]
	setCollapsedSections?: Dispatch<SetStateAction<string[]>>
	noTextLargeSmaller?: boolean
	mdDetails?: IMasterDetailListGroupDetail[]
}

export const MasterDetailListGroup = (props: IMasterDetailListGroupProps) => {
	interface IListGroupItem extends IMasterDetailListGroupMDLink {
		key: string
		panelURLCalc: string
		collapsed: boolean
	}

	const listGroupItems = useMemo<IListGroupItem[]>(
			() =>
					props.listGroupItems
							.filter((listGroupItem) => !listGroupItem.hidden)
							.map((listGroupItem, idx) => ({
								...listGroupItem,
								key: `${listGroupItem.linkKey ?? listGroupItem.panelTitle ?? listGroupItem.linkNode ?? idx}-${listGroupItem.id ?? ''}-${idx}`,
								panelURLCalc:
										listGroupItem.panelURL ??
										ToPascalCase(listGroupItem.linkKey ?? listGroupItem.panelTitle ?? (listGroupItem.linkNode ?? idx).toString()),
								collapsed: !!listGroupItem.section && (props.collapsedSections ?? []).includes(listGroupItem.section)
							})),
			[props.listGroupItems, props.collapsedSections]
	)

	let prevListGroupItem: IListGroupItem | null = null

	return (
			<MasterDetail
					setMenuBackItemState={props.setMenuBackItemState}
					mdPath={props.mdPath}
					breakAt={props.breakAt}
					backText={props.backText}
					rememberLast={props.rememberLast}
					className={props.className}>
				<MDMaster width={props.mdMasterWidth} className={props.mdMasterClassName}>
					{props.mdMasterTopNode}
					<ListGroup
							flush
							className={`fill-height-scroll ${props.noTextLargeSmaller ? '' : `text-large-${props.breakAt}-smaller`}`}>
						{listGroupItems.map((listGroupItem, idx) => {
							let prefix: ReactNode = null

							if (!!listGroupItem.section) {
								if (!prevListGroupItem || prevListGroupItem.section !== listGroupItem.section) {
									switch (props.sectionBreak) {
										case 'HR':
											prefix = idx > 0 ? <hr /> : null
											break
										case 'Gap':
											prefix = idx > 0 ? '' : null
											break
										default:
											prefix = (
													<ListGroupItemHeading
															onClick={() => {
																if (!!props.setCollapsedSections && !!listGroupItem.section) {
																	props.setCollapsedSections((prevState) => {
																		if (!listGroupItem.section) return prevState

																		if (prevState.includes(listGroupItem.section)) {
																			return prevState.filter((pS) => pS !== listGroupItem.section)
																		}

																		return [...prevState, listGroupItem.section]
																	})
																}
															}}
															className={ClassNames({
																'cursor-pointer': !!props.setCollapsedSections && !!listGroupItem.section
															})}>
														{listGroupItem.sectionNode ?? listGroupItem.section}
													</ListGroupItemHeading>
											)
											break
									}
								}
							} else if (!!listGroupItem.sectionNode) {
								console.warn(
										`MasterDetail ${props.mdPath} Item ${listGroupItem.panelTitle}:${
												listGroupItem.id ?? ''
										} has a sectionNode, but no section`
								)
							}

							prevListGroupItem = listGroupItem

							return (
									<React.Fragment key={listGroupItem.key}>
										{prefix}
										{listGroupItem.plainText ?
												<ListGroupItem hidden={listGroupItem.collapsed}
												               onClick={listGroupItem.linkClick ?? undefined}
												               className={
														               ClassNames({
															               'list-group-item': true,
															               'list-group-item-action': !listGroupItem.plainText && (!!listGroupItem.mdDetail || !!listGroupItem.linkClick),
															               'mt-4': prefix === ''
														               }) +
														               ' ' +
														               (listGroupItem.className ?? '')
												               }>
													{!!listGroupItem.faProps &&
															<FontAwesomeIcon fixedWidth {...listGroupItem.faProps} />}
													{listGroupItem.linkNode}
													<BadgeItem badge={listGroupItem.badge}
													           color={listGroupItem.badgeColor}
													           className='float-end small text-white border-round ms-2' />
													{listGroupItem.counter !== undefined && (
															<Badge
																	color={listGroupItem.counterColor}
																	className='float-end small text-white border-round ms-2'>
																{listGroupItem.counter !== null ? ToDigits(listGroupItem.counter, 0) :
																		<Spinner size='xs' />}
															</Badge>
													)}
												</ListGroupItem>
												:
												<MDLink
														hidden={listGroupItem.collapsed}
														tag='li'
														id={listGroupItem.id}
														panel={!listGroupItem.plainText ? listGroupItem.panelURLCalc : undefined}
														onClick={listGroupItem.linkClick ?? undefined}
														className={
																ClassNames({
																	'list-group-item': true,
																	'list-group-item-action': !listGroupItem.plainText && (!!listGroupItem.mdDetail || !!listGroupItem.linkClick),
																	'mt-4': prefix === ''
																}) +
																' ' +
																(listGroupItem.className ?? '')
														}>
													{!!listGroupItem.faProps &&
															<FontAwesomeIcon fixedWidth {...listGroupItem.faProps} />}
													{listGroupItem.linkNode}
													<BadgeItem badge={listGroupItem.badge}
													           color={listGroupItem.badgeColor}
													           className='float-end small text-white border-round ms-2' />
													{listGroupItem.counter !== undefined && (
															<Badge
																	color={listGroupItem.counterColor}
																	className='float-end small text-white border-round ms-2'>
																{listGroupItem.counter !== null ? ToDigits(listGroupItem.counter, 0) :
																		<Spinner size='xs' />}
															</Badge>
													)}
												</MDLink>
										}
									</React.Fragment>
							)
						})}
						{props.mdMasterBottomNode}
					</ListGroup>
					{props.mdMasterBottomOutsideNode}
				</MDMaster>
				{listGroupItems.map(
						(listGroupItem) =>
								!listGroupItem.collapsed &&
								!!listGroupItem.mdDetail && (
										<MDDetail
												key={listGroupItem.key}
												panel={listGroupItem.panelURLCalc}
												titleText={listGroupItem.linkKey ?? listGroupItem.panelTitle ?? listGroupItem.linkNode}>
											{listGroupItem.mdDetail}
										</MDDetail>
								)
				)}
				{(props.mdDetails ?? []).map((mdDetail, idx) => (
						<MDDetail
								key={(mdDetail.panelURL ?? mdDetail.panelTitle).toString() + idx}
								panel={mdDetail.panelURL ?? ToPascalCase(mdDetail.panelTitle)}
								titleText={mdDetail.panelTitle}>
							{mdDetail.mdDetail}
						</MDDetail>
				))}
			</MasterDetail>
	)
}
