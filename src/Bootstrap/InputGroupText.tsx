import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'

export interface IWInputGroupTextProps extends Omit<React.HTMLProps<HTMLSpanElement>, 'ref'> {
	tag?: string | React.ReactType
}

export const InputGroupText = (props: IWInputGroupTextProps) => {
	const TagToUse = props.tag ?? ('span' as React.ReactType)

	return (
		<TagToUse
			{...OmitProperty(props, 'tag', 'className')}
			className={`input-group-text ${props.className ?? ''}`.trim()}
		/>
	)
}
