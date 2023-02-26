import {SetStateAction, useCallback, useState} from 'react'

export type TStorageStateType = null | string | object | number | boolean | any[]

export type TStorageType = 'local' | 'session'

const ObjectToJSONString = (val: any) => `json:${JSON.stringify(val)}`

const JSONParse = <T = any>(json: any): T | null => {
	if (!json) {
		return null
	}

	if (typeof json === 'object') return json

	let returnObj = null

	try {
		returnObj = JSON.parse(json)
	} catch (err) {
		// console.log('JSONParse', err)

		return null
	}

	return returnObj
}

const JSONStringToObject = <T = any>(val: string): T => (!val ? undefined : val === 'json:undefined' ? undefined : val === 'json:null' ? null : JSONParse(val.toString().substring(5))) as T

export const setStorage = <T>(key: string | null | undefined, newValue: T, remember: TStorageType, defaultValue: T) => {
	if (!!key) {
		switch (remember) {
			case 'local':
				if (newValue === defaultValue) {
					window.localStorage.removeItem(key)
				} else {
					if (typeof newValue === 'string') {
						window.localStorage.setItem(key, newValue)
					} else {
						window.localStorage.setItem(key, ObjectToJSONString(newValue))
					}
				}
				break
			case 'session':
				if (newValue === defaultValue) {
					window.sessionStorage.removeItem(key)
				} else {
					if (typeof newValue === 'string') {
						window.sessionStorage.setItem(key, newValue)
					} else {
						window.sessionStorage.setItem(key, ObjectToJSONString(newValue))
					}
				}
				break
		}
	}
}

export const getStorage = <T>(key: string | null | undefined, remember: TStorageType, defaultValue: T): T => {
	if (!key) return defaultValue

	let newValue = (
		remember === 'local'
			? window.localStorage.getItem(key) ?? defaultValue
			: remember === 'session'
				? window.sessionStorage.getItem(key) ?? defaultValue
				: defaultValue
	) as T

	if (!!newValue && typeof newValue === 'string' && newValue.startsWith('json:')) {
		return JSONStringToObject(newValue)
	}

	return newValue
}

export const useStorage = <T>(
	key: string | null | undefined,
	defaultValue: T,
	remember: TStorageType = 'local'
): [T, (val: SetStateAction<T>) => void, () => void] => {
	const [value, setValue] = useState<T>(getStorage<T>(key, remember, defaultValue) ?? defaultValue)

	const saveValue = useCallback((val: SetStateAction<T>) => {
		if (typeof val === 'function') {
			setValue((prevState) => {
				if (!!key) {
					const newValue = (val as Function)(getStorage(key, remember, prevState ?? defaultValue))

					setStorage(key, newValue, remember, defaultValue)

					return newValue
				} else {
					return (val as Function)(prevState)
				}
			})
		} else {
			if (!!key) {
				setStorage(key, val, remember, defaultValue)
			}

			setValue(val)
		}
	}, [])

	const currentValue = !!key ? getStorage<T>(key, remember, defaultValue) ?? value : value

	return [currentValue, saveValue, () => saveValue(defaultValue)]
}
