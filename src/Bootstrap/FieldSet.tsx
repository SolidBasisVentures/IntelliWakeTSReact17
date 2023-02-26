import React, {createContext, useMemo} from 'react'
import {OmitProperty, RandomString} from '@solidbasisventures/intelliwaketsfoundation'
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

export interface IFieldSetPropsAddOns {
	breakAt?: TFieldSetBreakAt
	groupings?: EFieldSetGroupings
	hidden?: boolean
	condensed?: boolean
	fluid?: boolean
	fillHeight?: boolean
	fillHeightScroll?: boolean
}

export interface IFieldSetProps extends React.HTMLProps<HTMLFieldSetElement>, IFieldSetPropsAddOns {
}

interface IFieldSetContext extends Required<IFieldSetPropsAddOns> {
	uuid: string
}

const initialFieldSetContext = (): IFieldSetContext => ({
	hidden: false,
	breakAt: 'xs',
	groupings: EFieldSetGroupings.Half,
	uuid: RandomString(5),
	condensed: false,
	fluid: false,
	fillHeight: false,
	fillHeightScroll: false
})

export const FieldSetContext = createContext<IFieldSetContext>(initialFieldSetContext())

export const FieldSet = (props: IFieldSetProps) => {
	const iFSC = initialFieldSetContext()
	const contextProps = useMemo<IFieldSetContext>(
		() => ({
			hidden: props.hidden ?? iFSC.hidden,
			breakAt: props.breakAt ?? iFSC.breakAt,
			groupings: props.groupings ?? iFSC.groupings,
			condensed: props.condensed ?? iFSC.condensed,
			fluid: props.fluid ?? iFSC.fluid,
			uuid: RandomString(5),
			fillHeight: !!props.fillHeight,
			fillHeightScroll: !!props.fillHeightScroll
		}),
		[props]
	)

	const fieldSetProps = useMemo<React.HTMLProps<HTMLFieldSetElement>>(() => OmitProperty(props, 'breakAt', 'groupings', 'condensed', 'fluid', 'fillHeight', 'fillHeightScroll'), [props])

	return (
		<fieldset
			{...fieldSetProps}
			className={`${props.className ?? ''} ${props.fluid ? 'container-fluid' : 'container'} fieldSet ${
				props.condensed ? 'form-condensed p-1' : 'p-3'
			} ${ClassNames({
				'fill-height': !!props.fillHeight,
				'fill-height-scroll': !!props.fillHeightScroll
			})}`.trim()}>
			<FieldSetContext.Provider value={contextProps}>{props.children}</FieldSetContext.Provider>
		</fieldset>
	)
}
