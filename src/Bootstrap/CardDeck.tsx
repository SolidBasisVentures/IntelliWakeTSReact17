import React from 'react'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'
import {TFieldSetBreakAt} from './FieldSet'

export interface IWCardDeckProps extends Omit<React.HTMLProps<HTMLDivElement>, 'ref'> {
	tag?: string | React.ReactType
	breakAt?: TFieldSetBreakAt
	smallRows?: number
	largeRows?: number
}

export const CardDeck = (props: IWCardDeckProps) => {
	const TagToUse = props.tag ?? ('div' as React.ReactType)

	return (
		<TagToUse {...OmitProperty(props, 'tag', 'className', 'breakAt', 'smallRows', 'largeRows')} className={`card-deck ${!props.breakAt ? `row-cols-${props.smallRows ?? 'auto'}` : `row-cols-${props.breakAt}-${props.largeRows ?? 'auto'} row-cols-${props.smallRows ?? 'auto'}`} row ${props.className ?? ''}`.trim()} />
	)
}
