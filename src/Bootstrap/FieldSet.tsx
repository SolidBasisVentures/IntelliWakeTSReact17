import React, {createContext, ReactNode, ReactNodeArray, useMemo} from 'react'
import {RandomString} from '@solidbasisventures/intelliwaketsfoundation'
import {ClassNames} from '../Functions'

export enum EFieldSetGroupings {
	Half,
	Thirds,
	TwoThirds,
	QuartersEven,
	QuartersSmallLabel,
	LabelOver
}

export type TFieldSetBreakAt = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface IFieldSetProps {
	breakAt?: TFieldSetBreakAt
	groupings?: EFieldSetGroupings
	children?: ReactNode | ReactNodeArray
	className?: string
	hidden?: boolean
	condensed?: boolean
	fluid?: boolean
	fillHeight?: boolean
	fillHeightScroll?: boolean
}

interface IFieldSetContext extends Required<Omit<IFieldSetProps, 'children' | 'className'>> {
	uuid: string
}

const initialFieldSetContext: IFieldSetContext = {
	hidden: false,
	breakAt: 'xs',
	groupings: EFieldSetGroupings.Half,
	uuid: RandomString(5),
	condensed: false,
	fluid: false,
	fillHeight: false,
	fillHeightScroll: false
}

export const FieldSetContext = createContext<IFieldSetContext>(initialFieldSetContext)

export const FieldSet = (props: IFieldSetProps) => {
	const contextProps = useMemo<IFieldSetContext>(
		() => ({
			hidden: props.hidden ?? initialFieldSetContext.hidden,
			breakAt: props.breakAt ?? initialFieldSetContext.breakAt,
			groupings: props.groupings ?? initialFieldSetContext.groupings,
			condensed: props.condensed ?? initialFieldSetContext.condensed,
			fluid: props.fluid ?? initialFieldSetContext.fluid,
			uuid: RandomString(5),
			fillHeight: !!props.fillHeight,
			fillHeightScroll: !!props.fillHeightScroll
		}),
		[props]
	)
	
	return (
		<fieldset
			className={`${props.className ?? ''} ${props.fluid ? 'container-fluid' : 'container'} fieldSet ${
				props.condensed ? 'form-condensed p-1' : 'p-3'
			} ${ClassNames({
				'fill-height': !!props.fillHeight,
				'fill-height-scroll': !!props.fillHeightScroll
			})}`.trim()}
			hidden={props.hidden}>
			<FieldSetContext.Provider value={contextProps}>{props.children}</FieldSetContext.Provider>
		</fieldset>
	)
}
