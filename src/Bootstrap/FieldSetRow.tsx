import {RandomString} from '@solidbasisventures/intelliwaketsfoundation'
import React, {ReactElement, ReactNode, useContext, useMemo} from 'react'
import {EFieldSetGroupings, FieldSetContext} from './FieldSet'
import {Col, IIWColProps} from './Col'
import {Row} from './Row'

export enum EFieldRowInputWidth {
	Medium,
	Short
}

interface IProps {
	label?: ReactNode
	hidden?: boolean
	className?: string
	input: ReactElement | string | number | null | undefined
	inputFeedback?: ReactNode
	inputWidth?: EFieldRowInputWidth
	inputSecond?: ReactNode
	inputSecondFeedback?: ReactNode
	inputThird?: ReactNode
	inputThirdFeedback?: ReactNode
}

export const FieldSetRow = (props: IProps) => {
	const fieldSetContext = useContext(FieldSetContext)

	interface ISettings {
		uuid: string
		labelColProps?: IIWColProps
		inputColProps: IIWColProps
		input2ColProps?: IIWColProps
		input3ColProps?: IIWColProps
	}

	const settings = useMemo<ISettings>(() => {
		const items: ISettings = {
			uuid: `Input${fieldSetContext.uuid}${RandomString(5)}`,
			inputColProps: {}
		}

		const breakAt = fieldSetContext.groupings === EFieldSetGroupings.LabelOver ? 'xs' : fieldSetContext.breakAt

		const firstLabelSize =
			fieldSetContext.groupings === EFieldSetGroupings.LabelOver
				? 12
				: fieldSetContext.groupings === EFieldSetGroupings.TwoThirds
				? 8
				: fieldSetContext.groupings === EFieldSetGroupings.Half
				? 6
				: fieldSetContext.groupings === EFieldSetGroupings.Thirds
				? 4
				: fieldSetContext.groupings === EFieldSetGroupings.QuartersEven
				? 3
				: 2

		const firstFieldSize =
			fieldSetContext.groupings === EFieldSetGroupings.LabelOver
				? 12
				: !props.inputThird
				? !props.inputSecond
					? props.inputWidth === undefined
						? 12 - firstLabelSize
						: fieldSetContext.groupings === EFieldSetGroupings.Half
						? 6
						: fieldSetContext.groupings === EFieldSetGroupings.Thirds
						? props.inputWidth === EFieldRowInputWidth.Medium
										? 6
										: 4
						: fieldSetContext.groupings === EFieldSetGroupings.QuartersEven
						? props.inputWidth === EFieldRowInputWidth.Medium
							? 6
							: 3
						: props.inputWidth === EFieldRowInputWidth.Medium
						? 6
						: props.inputWidth === EFieldRowInputWidth.Short
						? 4
						: 10
					: fieldSetContext.groupings === EFieldSetGroupings.Half
					? 3
					: fieldSetContext.groupings === EFieldSetGroupings.Thirds
					? 4
					: fieldSetContext.groupings === EFieldSetGroupings.QuartersEven
					? props.inputWidth === EFieldRowInputWidth.Medium
						? 6
						: 3
					: props.inputWidth === EFieldRowInputWidth.Medium
					? 6
					: 2
				: fieldSetContext.groupings === EFieldSetGroupings.Half
				? 2
				: fieldSetContext.groupings === EFieldSetGroupings.Thirds
				? props.inputWidth === EFieldRowInputWidth.Short
					? 2
					: 3
				: fieldSetContext.groupings === EFieldSetGroupings.QuartersEven
				? 3
				: props.inputWidth === EFieldRowInputWidth.Short
				? 2
				: 4

		const secondFieldSize =
			fieldSetContext.groupings === EFieldSetGroupings.LabelOver
				? 12
				: !props.inputThird
				? 12 - firstLabelSize - firstFieldSize
				: fieldSetContext.groupings === EFieldSetGroupings.QuartersEven
				? 3
				: 2

		const thirdFieldSize =
			fieldSetContext.groupings === EFieldSetGroupings.LabelOver
				? 12
				: 12 - firstLabelSize - firstFieldSize - secondFieldSize

		if (!!props.label) {
			items.labelColProps = {}
			items.labelColProps.className = 'strong'
			if (breakAt === 'xs') {
				items.labelColProps.className += firstLabelSize === 12 ? '' : ' text-end'
				items.labelColProps.xs = firstLabelSize
				items.inputColProps.xs = firstFieldSize
			} else {
				items.labelColProps.className += ` text-${breakAt}-end text-start`
				items.labelColProps.xs = 12
				items.labelColProps[breakAt] = firstLabelSize
				items.inputColProps.xs = 12
				items.inputColProps[breakAt] = firstFieldSize
			}
		} else {
			if (breakAt === 'xs') {
				items.inputColProps.xs = {offset: firstLabelSize, size: firstFieldSize}
			} else {
				items.inputColProps.xs = firstFieldSize + firstLabelSize // Change this if want to spread over other fields
				items.inputColProps[breakAt] = {offset: firstLabelSize, size: firstFieldSize}
			}
		}

		if (!!props.inputSecond) {
			items.input2ColProps = {}
			if (!!props.inputThird) {
				items.input3ColProps = {}

				if (breakAt === 'xs') {
					items.input2ColProps.xs = secondFieldSize
					items.input3ColProps.xs = thirdFieldSize
				} else {
					items.input2ColProps.xs = 12
					items.input3ColProps.xs = 12
					items.input2ColProps[breakAt] = secondFieldSize
					items.input3ColProps[breakAt] = thirdFieldSize
				}

				if (typeof props.inputThird === 'string') {
					items.input3ColProps.className = 'form-text'
				}
			} else {
				if (breakAt === 'xs') {
					items.input2ColProps.xs = secondFieldSize
				} else {
					items.input2ColProps.xs = 12
					items.input2ColProps[breakAt] = secondFieldSize
				}
			}

			if (typeof props.inputSecond === 'string') {
				items.input2ColProps.className = 'form-text strong'
				if (breakAt === 'xs') {
					items.input2ColProps.className += secondFieldSize === 12 ? '' : ' text-end'
				} else {
					items.input2ColProps.className += ` text-${breakAt}-end text-start`
				}
			}
		}

		return items
	}, [props, fieldSetContext])

	// noinspection SuspiciousTypeOfGuard
	const element =
		!!props.input && typeof props.input === 'object'
			? React.cloneElement(<>{props.input}</>, {id: props.input.props.id ?? settings.uuid})
			: React.cloneElement(<span className="form-control-plaintext">{props.input ?? ''}</span>, {id: settings.uuid})

	// noinspection SuspiciousTypeOfGuard
	return (
		<Row
			className={`${fieldSetContext.condensed ? '' : 'mb-3'} fieldSetRow ${props.className ?? ''}`.trim()}
			hidden={props.hidden}>
			{!!props.label && !!settings.labelColProps && (
				<Col {...settings.labelColProps}>
					<label className="col-form-label" htmlFor={element.props.id}>
						{props.label}
					</label>
				</Col>
			)}
			<Col {...settings.inputColProps}>
				{element}
				{props.inputFeedback}
			</Col>
			{!!props.inputSecond && !!settings.input2ColProps && (
				<Col {...settings.input2ColProps}>
					{props.inputSecond}
					{props.inputSecondFeedback}
				</Col>
			)}
			{!!props.inputThird && !!settings.input3ColProps && (
				<Col {...settings.input3ColProps}>
					{props.inputThird}
					{props.inputThirdFeedback}
				</Col>
			)}
		</Row>
	)
}
