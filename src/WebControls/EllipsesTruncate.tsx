import React, {ReactNode, ReactNodeArray} from 'react'

interface IProps {
	text: ReactNode
	prefix?: ReactNode | ReactNodeArray | string | boolean | null
	suffix?: ReactNode | ReactNodeArray | string | boolean | null
	className?: string
	hidden?: boolean
	noTruncate?: boolean
	print?: boolean
}

export const EllipsesTruncate = (props: IProps) => {
	if (props.hidden || !props.text) return null
	
	return (
		<>
			{props.prefix}
			<div
				className={'w-auto py-0 ' + (!!props.noTruncate ? '' : 'ellipses-truncate ') + (!!props.print ? 'ellipses-truncate-print ' : '') + (props.className ?? '')}
				title={!!props.noTruncate || typeof props.text !== 'string' ? undefined : props.text}
				style={{maxWidth: '100%'}}>
				{props.text}
			</div>
			{props.suffix}
		</>
	)
}
