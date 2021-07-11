import React, {useMemo} from 'react'
import {Link} from 'react-router-dom'
import {HandleChangeValue, IIWInputProps, ReduceInputProps} from './IWInputProps'
import {OmitProperty} from '@solidbasisventures/intelliwaketsfoundation'

export function InputColor<T>(props: IIWInputProps<T>) {
	const inputProps = useMemo(() => {
		const subset = ReduceInputProps(OmitProperty(props, 'className'))

		if (subset.autoComplete === undefined) {
			subset.autoComplete = 'off'
		}

		return subset
	}, [props])

	return (
		<>
			{!!props.plainText ? (
				!!props.plainTextURL ? (
					<Link to={props.plainTextURL}>
						<div className="form-control-plaintext" {...props.plainTextProps}>
							<input type="color" className={'inputText ' + props.className ?? ''} {...inputProps} disabled />
							{props.value}
						</div>
					</Link>
				) : (
					<div className="form-control-plaintext" {...props.plainTextProps}>
						<input type="color" className={'inputText ' + props.className ?? ''} {...inputProps} disabled />
						{props.value}
					</div>
				)
			) : (
				<input
					type="color"
					className={'inputText ' + props.className ?? ''}
					{...inputProps}
					onChange={(e) => HandleChangeValue(e, props.changeValue, props.onChange)}
				/>
			)}
		</>
	)
}
