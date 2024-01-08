import React, { Component } from 'react'
import './App.css'

export class Field extends Component {
	render() {
		const { field, onCellClick } = this.props

		return (
			<div className='field'>
				{field.map((value, index) => (
					<div
						key={index}
						className={`cell ${value}`}
						onClick={() => onCellClick(index)}
					>
						{value}
					</div>
				))}
			</div>
		)
	}
}
