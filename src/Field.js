import React from 'react'
import './App.css'

export const Field = ({ field, onCellClick }) => {
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
