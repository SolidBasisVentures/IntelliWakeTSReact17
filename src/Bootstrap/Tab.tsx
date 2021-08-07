import React, {ReactNode, useCallback, useEffect, useRef, useState} from 'react'
import {FontAwesomeIcon, FontAwesomeIconProps} from '@fortawesome/react-fontawesome'
import {TStorageType, useStorage} from '../Hooks/useStorage'
import {Button} from './Button'
import {IModalPromptProps, ModalPrompt} from '../WebControls/ModalPrompt'
import {ClassNames} from '../Functions'

export interface IIWTab {
	faProps?: FontAwesomeIconProps
	title: string
	hide?: boolean
	disabled?: boolean
	pane: ReactNode
	fillHeight?: boolean | 'noScroll'
	loadedOnlyWhenActive?: boolean
	ariaLabelTab?: string
	ariaLabelPane?: string
}

export type TPaneLoading = 'All' | 'OnlyActive' | 'KeepOnceLoaded'

export interface IWTabProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
	tabs: IIWTab[]
	paneLoading?: TPaneLoading
	rememberKey?: string
	rememberType?: TStorageType
	openTab?: string
	setOpenTab?: (tab: string) => void
	openTabChanged?: (tab: string) => void
	isDirty?: boolean
	tabType?: 'tabs' | 'pills'
	fillHeight?: boolean | 'noScroll'
	classNamePanes?: string
	classNamePaneActive?: string
	noPanePadding?: boolean
	noPaneBorder?: boolean
	navClassName?: string
	navItemClassName?: string
	navItemSpanClassName?: string
	padTabs?: boolean
}

export const Tab = (props: IWTabProps) => {
	const isChanging = useRef(false)
	const loadedTabs = useRef<(string | undefined)[]>([])
	const showTabs = props.tabs.filter((tab) => !tab.hide)
	const defaultTab = showTabs.find((tab) => !tab.disabled && (!props.openTab || tab.title === props.openTab))?.title
	const [openTab, setOpenTab] = useStorage<string>(
		props.rememberKey,
		defaultTab ?? ('' as any),
		props.rememberType ?? 'session'
	)
	const [modalPromptProps, setModalPromptProps] = useState<null | IModalPromptProps>(null)

	const actualOpenTab = showTabs.find(
		(tab) => !tab.disabled && tab.title === (!!props.setOpenTab ? props.openTab : openTab)
	)?.title

	const setActualOpenTab = useCallback(props.setOpenTab ?? setOpenTab, [props, setOpenTab])

	const openTabChanged = useCallback(props.openTabChanged ?? (() => {}), [props])

	const changeOpenTab = useCallback(
		(tabTitle: string) => {
			if (actualOpenTab !== tabTitle) {
				if (!props.isDirty) {
					setActualOpenTab(tabTitle)
					openTabChanged(tabTitle)
				} else {
					setModalPromptProps({
						title: 'Abandon Changes?',
						messageBody: 'Are you sure you want to abandon changes?',
						color: 'danger',
						okLabel: 'Abandon',
						okAction: () => {
							setActualOpenTab(tabTitle)
							openTabChanged(tabTitle)
						}
					})
				}
			}
		},
		[actualOpenTab, props.isDirty, setActualOpenTab, openTabChanged]
	)

	useEffect(() => {
		if (!actualOpenTab) {
			if (!isChanging.current) {
				const gotoTab = showTabs.find((tab) => !tab.disabled)?.title
				if (gotoTab) {
					isChanging.current = true
					setActualOpenTab(gotoTab)
					openTabChanged(gotoTab)
				}
			}
		} else {
			isChanging.current = false
			if (!loadedTabs.current.includes(actualOpenTab)) loadedTabs.current = [...loadedTabs.current, actualOpenTab]
		}
	}, [actualOpenTab, openTabChanged, setActualOpenTab, showTabs])

	if (!actualOpenTab) return null

	// "px-4 mt-3 mx-0 gray-tabs"
	// p-2 background-gray overflow-hidden

	return (
		<div className={`${props.className} tabControlParent ${ClassNames({'fill-height': !!(props.fillHeight ?? true)})}`.trim()}>
			<ModalPrompt {...modalPromptProps} dismiss={setModalPromptProps} />
			<ul className={`nav nav-${props.tabType ?? 'tabs'}${props.padTabs ? ' px-4' : ''} ${props.navClassName ?? ''}`.trim()}>
				{showTabs.map((tab) => (
					<li key={tab.title} className={`nav-item ${props.navItemClassName ?? ''}`.trim()}>
						<Button
							color="link"
							className={ClassNames({
								'nav-link': true,
								active: actualOpenTab === tab.title
							})}
							disabled={!!tab.disabled}
							onClick={() => {
								if (!tab.hide && !tab.disabled) {
									changeOpenTab(tab.title)
								}
							}}
						aria-label={tab.ariaLabelTab ?? `Tab: ${tab.title}`}>
							{!!tab.faProps && <FontAwesomeIcon {...tab.faProps} fixedWidth={!!tab.title} className={!!tab.title ? "fa-fw-desktop" : ''} />}
							<span className={props.navItemSpanClassName}>{tab.title}</span>
						</Button>
					</li>
				))}
			</ul>
			<div
				className={ClassNames({
					'tab-content': true,
					'fill-height': !!(props.fillHeight ?? true),
					'border-left': !props.noPaneBorder,
					'border-right': !props.noPaneBorder,
					'border-bottom': !props.noPaneBorder
				})}>
				{showTabs
					.filter(
						(tab) =>
							!tab.hide &&
							(!tab.loadedOnlyWhenActive || tab.title === actualOpenTab) &&
							(!props.paneLoading ||
								props.paneLoading === 'All' ||
								tab.title === actualOpenTab ||
								(props.paneLoading === 'KeepOnceLoaded' &&
									loadedTabs.current.some((loadedTab) => tab.title === loadedTab)))
					)
					.map((tab) => (
						<div
							key={tab.title}
							className={
								(props.classNamePanes ?? '') +
								' ' +
								(tab.title === actualOpenTab ? props.classNamePaneActive ?? '' : '') +
								' ' +
								ClassNames({
									show: tab.title === actualOpenTab,
									active: tab.title === actualOpenTab,
									'fill-height': (tab.fillHeight ?? props.fillHeight) === 'noScroll',
									'fill-height-scroll': (tab.fillHeight ?? props.fillHeight ?? true) === true,
									'p-2': !props.noPanePadding
								}) +
								' tab-pane fade '
							}
							aria-label={tab.ariaLabelPane ?? `Pane: ${tab.title}`}>
							{tab.pane}
						</div>
					))}
			</div>
		</div>
	)
}
