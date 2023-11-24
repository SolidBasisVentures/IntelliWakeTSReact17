import {OmitProperty, TextToHTML} from '@solidbasisventures/intelliwaketsfoundation'
import React from 'react'

interface IProps extends React.HTMLProps<HTMLSpanElement> {
	key?: any
	text: string | null | undefined
}

export const HTMLFromText = (props: IProps) => {
	return !!props.text ?
		<span
			dangerouslySetInnerHTML={{
				__html: TextToHTML(props.text)
			}}
			{...OmitProperty(props, 'text')}
		/>
		: null
}
