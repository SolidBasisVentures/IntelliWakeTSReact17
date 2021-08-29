import React, {ReactNode, ReactNodeArray} from 'react'
import {InputGroup} from '../Bootstrap/InputGroup'
import {InputGroupText} from '../Bootstrap/InputGroupText'

interface IProps {
	children?: ReactNode | ReactNodeArray
	prepend?: ReactNode
	append?: ReactNode
}

export const InputGroupWrapper = (props: IProps) => {
	return (
		<>
			{!!props.prepend || !!props.append ? (
				<InputGroup>
					{!!props.prepend && (
							<InputGroupText>{props.prepend}</InputGroupText>
					)}
					{props.children}
					{!!props.append && (
							<InputGroupText>{props.append}</InputGroupText>
					)}
				</InputGroup>
			) : (
				<>{props.children}</>
			)}
		</>
	)
}
