import React, {ReactNode, ReactNodeArray} from 'react'

interface IProps {
	text: ReactNode | ReactNodeArray | string | boolean | null | undefined
	prefix?: ReactNode | ReactNodeArray | string | boolean | null
	suffix?: ReactNode | ReactNodeArray | string | boolean | null
	className?: string
	hidden?: boolean
	noBR?: boolean
}

export const BRBefore = (props: IProps) => {
	if (props.hidden || !props.text) return null

	return (
		<span className={props.className}>
			{!props.noBR && <br />}
			{props.prefix}
			{props.text}
			{props.suffix}
		</span>
	)
}
