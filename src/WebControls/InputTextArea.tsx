import React, {useMemo} from 'react'
import {IIWInputProps, ReduceInputProps, ReduceToInputAddProps} from './IWInputProps'
import {CleanScripts, OmitProperty, ReplaceLinks} from '@solidbasisventures/intelliwaketsfoundation'
import {InputWrapper} from './InputWrapper'

interface IProps<T = any, V = string, H = HTMLTextAreaElement> extends IIWInputProps<T, V, H> {
	bordered?: boolean
	rows?: number
}

export function InputTextArea<T = any, V = string, H = HTMLTextAreaElement>(props: IProps<T, V, H>) {
	const inputProps = useMemo(() => {
		let subset = ReduceInputProps(OmitProperty(props, 'bordered'))

		subset.value = (props.value ?? '') as any

		return subset
	}, [props])

	return (
		<>
			<InputWrapper
				doNotSelectOnFocus
				{...ReduceToInputAddProps(props)}
				className="inputTextArea form-control"
				plainTextControl={
					<div
						className={'form-control-plaintext vertical-scroll horizontal-scroll' + (!!props.bordered ? ' border' : '')}
						{...props.plainTextProps}
						dangerouslySetInnerHTML={{__html: ReplaceLinks(CleanScripts('' + props.value))}}
						style={{
							maxHeight: !!props.rows ? props.rows + 'em' : '5em',
							overflowY: 'scroll'
						}}
					/>
				}>
				<textarea {...inputProps} />
			</InputWrapper>
		</>
	)
}
