import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as PIXI from 'pixi.js'
import { TweenMax } from 'gsap'
// import { connect } from 'react-redux'

class Perfil extends Component {
  /* estado */
  state = {
	}
	/* created */
	componentDidMount (prev_props, prev_state) {
		this.props.dispatch({
			type: 'OPEN_RIGHT',
			open: true
		})
	}
	/* created */
	/* methods */
	back = () => {
		this.props.history.push('/')
	}
	/* methods */
	render() {
		console.log('aqui entro a prueba')
    return (
      <h1 onClick={this.back}>
				Esto es una prueba
			</h1>
    )
  }
}

function mapStateToProps(state, props) {
  return {
		aniStep: state.aniStep
  }
}

export default connect(mapStateToProps)(Perfil)