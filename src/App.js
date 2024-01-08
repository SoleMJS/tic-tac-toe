import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field } from './Field'
import { Information } from './Information'
import { WIN_PATTERNS } from './constant/win-patterns'
import { RESTART_GAME, UPDATE_FIELD } from './store'

class App extends Component {
	handleCellClick = index => {
		const { field, isGameEnded, currentPlayer, dispatch } = this.props

		if (!field[index] && !isGameEnded) {
			const updatedField = [...field]
			updatedField[index] = currentPlayer

			if (this.checkWinner(updatedField)) {
				dispatch({
					type: UPDATE_FIELD,
					payload: {
						field: updatedField,
						isGameEnded: true,
					},
				})
			} else if (updatedField.every(cell => cell !== '')) {
				dispatch({
					type: UPDATE_FIELD,
					payload: {
						field: updatedField,
						isGameEnded: true,
						isDraw: true,
					},
				})
			} else {
				dispatch({
					type: UPDATE_FIELD,
					payload: {
						field: updatedField,
						currentPlayer: currentPlayer === 'X' ? 'O' : 'X',
					},
				})
			}
		}
	}

	handleRestartClick = () => {
		this.props.dispatch({ type: RESTART_GAME })
	}

	checkWinner = currentField => {
		const lines = this.props.WIN_PATTERNS

		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i]
			if (
				currentField[a] &&
				currentField[a] === currentField[b] &&
				currentField[a] === currentField[c]
			) {
				return true
			}
		}

		return false
	}

	render() {
		const { currentPlayer, isGameEnded, isDraw, field } = this.props

		return (
			<div className='App'>
				<h1>Крестики-Нолики</h1>
				<Information
					currentPlayer={currentPlayer}
					isGameEnded={isGameEnded}
					isDraw={isDraw}
				/>
				<Field field={field} onCellClick={this.handleCellClick} />
				<button className='restart-button' onClick={this.handleRestartClick}>
					Начать заново
				</button>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	currentPlayer: state.currentPlayer,
	isGameEnded: state.isGameEnded,
	isDraw: state.isDraw,
	field: state.field,
	WIN_PATTERNS: WIN_PATTERNS,
})

export default connect(mapStateToProps)(App)
