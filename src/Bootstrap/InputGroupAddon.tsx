import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'

export interface IWInputGroupTextAddonProps extends Omit<React.HTMLProps<HTMLSpanElement>, 'ref'> {
	tag?: string | React.ReactType
	addonType: 'prepend' | 'append'
}

export const InputGroupAddon = (props: IWInputGroupTextAddonProps) => {
	const TagToUse = props.tag ?? ('span' as React.ReactType)

	return (
		<TagToUse
			{...OmitProperty(props, 'tag', 'className', 'addonType')}
			className={`input-group-text input-group-${props.addonType} ${props.className ?? ''}`.trim()}
		/>
	)
}
