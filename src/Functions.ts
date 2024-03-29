import React, {LegacyRef, MutableRefObject} from 'react'
import {CleanNumber, DateFormatAny, ReplaceAll} from '@solidbasisventures/intelliwaketsfoundation'

export const KEY_UP_ARROW = 38
export const KEY_DOWN_ARROW = 40
export const KEY_LEFT_ARROW = 37
export const KEY_RIGHT_ARROW = 39
export const KEY_SPACE = 32
export const KEY_ENTER = 13
export const KEY_TAB = 9
export const KEY_BACKSPACE = 8
export const KEY_ESCAPE = 27

export type TKeyboardKey =
	'Enter'
	| 'ArrowDown'
	| 'ArrowUp'
	| 'ArrowLeft'
	| 'ArrowRight'
	| 'Tab'
	| 'Backspace'
	| 'Escape'

export const KEY_STRING_ENTER = 'Enter'
export const KEY_STRING_DOWN_ARROW = 'ArrowDown'
export const KEY_STRING_UP_ARROW = 'ArrowUp'
export const KEY_STRING_LEFT_ARROW = 'ArrowLeft'
export const KEY_STRING_RIGHT_ARROW = 'ArrowRight'
export const KEY_STRING_TAB = 'Tab'
export const KEY_STRING_BACKSPACE = 'Backspace'
export const KEY_STRING_ESCAPE = 'Escape'

export const ElementCustomValue = (e: React.ChangeEvent<any>): any => {
	const target: any = e.target

	if (!!target) {
		const returnValue = target['customValue'] === undefined ? target.value : target.customValue
		if (!!target.classList && target.classList.contains('isNumber')) {
			return CleanNumber(returnValue)
		}
		return returnValue
	}

	return null
}

export type TClassNames = { [key: string]: boolean }

export const ClassNames = (classes: TClassNames, fixedClasses = ''): string => {
	return `${(Object.keys(classes).filter((classitem) => classes[classitem]) ?? []).join(' ')} ${fixedClasses}`.trim()
}

export const HasPathComponent = (search: string): boolean => {
	let searchCalc = search.toLowerCase()

	if (!searchCalc.startsWith('/')) {
		searchCalc = '/' + searchCalc
	}

	if (!searchCalc.endsWith('/')) {
		searchCalc += '/'
	}

	let pathName = window.location.pathname.toLowerCase()
	if (!pathName.endsWith('/')) {
		pathName += '/'
	}

	return pathName.indexOf(searchCalc) >= 0
}

/**
 * Gets both "active" (before the ~) and "inactive" components of the current path name as string arrays
 *
 * @constructor
 */
export const GetPathComponentsActiveInactive = (): { active: string[], inactive: string[] } => {
	let tildeFound = false
	return window.location.pathname.split('/').reduce<{ active: string[], inactive: string[] }>((results, component) => {
		if (component === '~') {
			tildeFound = true
			return results
		}

		if (!component) return results

		if (tildeFound) {
			return {
				active: results.active,
				inactive: [...results.inactive, component]
			}
		} else {
			return {
				active: [...results.active, component],
				inactive: results.inactive
			}
		}
	}, {active: [], inactive: []})
}

/**
 * Gets "active" components (before the ~) of the current path name as a string array
 *
 * @constructor
 */
export const GetPathComponentsActive = (): string[] => GetPathComponentsActiveInactive().active

/**
 * Searches the last component of the active (before the tilde) path (or multiple components if includeReverseIndexes > 1) to see if a lower case match of the search is included
 *
 * @param search
 * @param includeReverseIndexes
 * @constructor
 */
export const ActivePathComponentEndsWith = (search: string | undefined | null, includeReverseIndexes = 1): boolean => {
	if (!search) return false

	const actives = GetPathComponentsActive()

	return actives.some((active, idx) => idx >= (actives.length - includeReverseIndexes) && active.toLowerCase() === search.toLowerCase())
}

export const GetPathComponentAfter = (search: string | undefined | null): string | undefined => {
	if (!search) return undefined

	let searchCalc = search.toLowerCase()

	if (!searchCalc.endsWith('/')) {
		searchCalc += '/'
	}

	const startPos = window.location.pathname.toLowerCase().indexOf(searchCalc)

	if (startPos >= 0) {
		const after = window.location.pathname.substring(startPos + searchCalc.length)
		const slashPos = after.toLowerCase().indexOf('/')
		if (slashPos >= 0) {
			return after.substring(0, slashPos)
		} else {
			return after
		}
	}
	return undefined
}

export const GetPathComponentAt = (search: string | undefined | null, toEnd = true): string | undefined => {
	if (!search) return undefined

	let searchCalc = search.toLowerCase()

	if (!searchCalc.startsWith('/')) {
		searchCalc = '/' + searchCalc
	}

	const startPos = window.location.pathname.toLowerCase().indexOf(searchCalc)

	if (startPos >= 0) {
		let result = window.location.pathname.substring(startPos + 1)

		if (toEnd) return result

		const slashPos = result.indexOf('/')
		if (slashPos >= 0) {
			return result.substring(0, slashPos)
		} else {
			return result
		}
	}

	return undefined
}

export const GetPathThrough = (search: string | undefined | null): string | undefined => {
	if (!search) return undefined

	let searchCalc = search.toLowerCase()

	const startPosSlash = window.location.pathname.toLowerCase().lastIndexOf(searchCalc + '/')

	if (startPosSlash >= 0) {
		return window.location.pathname.substring(0, startPosSlash + searchCalc.length)
	}

	const startPosNoSlash = window.location.pathname.toLowerCase().lastIndexOf(searchCalc)

	if (startPosNoSlash >= 0) {
		const possibleComplete = window.location.pathname.substring(0, startPosNoSlash + searchCalc.length)

		if (possibleComplete.length === window.location.pathname.length) {
			return possibleComplete
		}
	}

	return undefined
}

export const CaptureGPS = (): Promise<GeolocationPosition | null> => {
	return new Promise(async (resolve) => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				function (position) {
					resolve(position)
				},
				function () {
					resolve(null)
				}
			)
		} else {
			resolve(null)
		}
	})
}

export const DownloadBase64Data = (fileName: string, base64: string) => {
	const link = document.createElement('a')
	link.href = base64
	link.setAttribute('download', fileName)
	document.body.appendChild(link)
	link.click()
}

export const CopyRefToClipboard = (ref: any, tryFormatted = true): boolean => {
	if (ref && ref.current && document.createRange && window.getSelection) {
		let range = document.createRange()
		let sel = window.getSelection()
		if (sel) {
			// unselect any element in the page
			sel.removeAllRanges()

			const elsNoCopy = ref.current.getElementsByClassName('noCopy')
			for (let el of elsNoCopy) {
				el.classList.add('noCopyActive')
			}

			const buttonsNoCopy = ref.current.getElementsByTagName('button')
			for (let el of buttonsNoCopy) {
				el.classList.add('noCopyActive')
			}

			const elsOnlyCopy = ref.current.getElementsByClassName('onlyCopy')
			for (let el of elsOnlyCopy) {
				el.classList.add('onlyCopyActive')
			}

			// let ths = ref.current.getElementsByTagName('th') as any[]
			// for (let i = 0; i < ths.length; i++) {
			// 	ths[i].setAttribute('copyuserselect', ths[i].style.userSelect)
			// 	ths[i].style.userSelect = ths[i].classList.contains('noCopy') ? 'none' : 'auto'
			// 	if (ths[i].classList.contains('onlyCopy')) {
			// 		ths[i].setAttribute('copyuserdisplay', ths[i].style.display)
			// 		ths[i].style.display = 'inherit'
			// 	}
			// }
			// let tds = ref.current.getElementsByTagName('td') as any[]
			// for (let i = 0; i < tds.length; i++) {
			// 	tds[i].setAttribute('copyuserselect', tds[i].style.userSelect)
			// 	tds[i].style.userSelect = tds[i].classList.contains('noCopy') ? 'none' : 'auto'
			// 	if (tds[i].classList.contains('onlyCopy')) {
			// 		tds[i].setAttribute('copyuserdisplay', ths[i].style.display)
			// 		tds[i].style.display = 'inherit'
			// 	}
			// }
			let brs = ref.current.getElementsByTagName('br') as any[]
			for (let i = 0; i < brs.length; i++) {
				brs[i].setAttribute('copyuserdisplay', brs[i].style.display)
				brs[i].style.display = 'none'
			}
			let hrs = ref.current.getElementsByTagName('hr') as any[]
			for (let i = 0; i < hrs.length; i++) {
				hrs[i].setAttribute('copyuserdisplay', hrs[i].style.display)
				hrs[i].style.display = 'none'
			}

			if (tryFormatted) {
				try {
					range.selectNode(ref.current as any)
					sel.addRange(range)
				} catch (e) {
					range.selectNodeContents(ref.current as any)
					sel.addRange(range)
				}
			} else {
				range.selectNodeContents(ref.current as any)
				sel.addRange(range)
			}

			document.execCommand('copy')

			sel.removeAllRanges()

			// for (let i = 0; i < ths.length; i++) {
			// 	ths[i].style.userSelect = ths[i].getAttribute('copyuserselect')
			// 	ths[i].removeAttribute('copyuserselect')
			// 	if (ths[i].classList.contains('onlyCopy')) {
			// 		ths[i].style.display = ths[i].getAttribute('display')
			// 		ths[i].removeAttribute('copyuserdisplay')
			// 	}
			// }
			// for (let i = 0; i < tds.length; i++) {
			// 	tds[i].style.userSelect = tds[i].getAttribute('copyuserselect')
			// 	tds[i].removeAttribute('copyuserselect')
			// 	if (tds[i].classList.contains('onlyCopy')) {
			// 		tds[i].style.display = tds[i].getAttribute('display')
			// 		tds[i].removeAttribute('copyuserdisplay')
			// 	}
			// }
			for (let el of elsNoCopy) {
				el.classList.remove('noCopyActive')
			}

			for (let el of buttonsNoCopy) {
				el.classList.remove('noCopyActive')
			}

			for (let el of elsOnlyCopy) {
				el.classList.remove('onlyCopyActive')
			}

			for (let i = 0; i < brs.length; i++) {
				brs[i].style.display = brs[i].getAttribute('display')
				brs[i].removeAttribute('copyuserdisplay')
			}
			for (let i = 0; i < hrs.length; i++) {
				hrs[i].style.display = hrs[i].getAttribute('display')
				hrs[i].removeAttribute('copyuserdisplay')
			}

			return true
		}
	}
	return false
}

export const TableIDToExcel = (tableID: string, fileName?: string, appendDateTime = true) => {
	const downloadName = `${fileName ?? tableID}${
		appendDateTime ? `-${DateFormatAny('YYYY-MM-DD_HH-mm-ss', 'now')}.xls` : ''
	}`
	// const dataType = 'application/vnd.ms-excel'
	const dataType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
	const tableSelect = document.getElementById(tableID) as any

	let tableHTML = tableSelect.outerHTML //.replace(/ /g, '%20')

	tableHTML = ReplaceAll('<br>', ' ', tableHTML)

	let a = document.createElement('a')
	const blob = new Blob([tableHTML], {type: dataType})
	a.href = URL.createObjectURL(blob)
	a.download = downloadName
	a.click()
}

export type TBootStrapSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type TBootStrapExtendedSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'

export const SizeAtMin = (size: TBootStrapExtendedSizes): number => {
	switch (size) {
		case 'xs':
			return 0
		case 'sm':
			return 576
		case 'md':
			return 768
		case 'lg':
			return 992
		case 'xl':
			return 1200
		case 'xxl':
			return 1300
		case 'xxxl':
			return 1400
	}
}

export const SizeAtMax = (size: TBootStrapExtendedSizes): number => {
	switch (size) {
		case 'xs':
			return 575.98
		case 'sm':
			return 767.98
		case 'md':
			return 991.98
		case 'lg':
			return 1199.98
		case 'xl':
			return 1299.98
		case 'xxl':
			return 1399.98
		case 'xxxl':
			return 999999
	}
}

export const useCombinedRefs = <T>(...refs: (LegacyRef<T> | null)[]): MutableRefObject<T | undefined> | null => {
	const targetRef = React.useRef<T>()

	React.useEffect(() => {
		refs.forEach((ref: any) => {
			if (!ref) return

			if (typeof ref === 'function') {
				ref(targetRef.current)
			} else {
				ref.current = targetRef.current
			}
		})
	}, [refs])

	return targetRef
}
