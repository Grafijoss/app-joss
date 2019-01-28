import React, { Component } from 'react'
// import * as PIXI from 'pixi.js'
import { TweenMax } from 'gsap'
// import PixiPlugin from 'gsap/PixiPlugin'
// import PropTypes from 'prop-types'
// https://github.com/inlet/react-pixi
// import sequence  from '../assets/images/sprite.png'
import { connect } from 'react-redux';


class Menuicons extends Component {
  /* estado */
  state = {
  }
	/* estado */
	/* created */
  componentDidMount (prev_props, prev_state) {
		console.log(this.props)
		this.fnIni1()
	}
	/* created */
	/* methods */
	/* bt1 */
	fnIni1 = () => {
    let bt = document.getElementById('bt1')
    TweenMax.to(bt, 0.8, {opacity: 1, onComplete: () => {
			this.fnIni2()
			this.props.dispatch({
				type: 'ANIMATE_STEP',
				step: 1
			})
		}})
	}
	/* bt1 */
	/* bt2 */
	fnIni2 = () => {
    let bt = document.getElementById('bt2')
    TweenMax.to(bt, 0.8, {opacity: 1, onComplete: () => {
			this.fnIni3()
			this.props.dispatch({
				type: 'ANIMATE_STEP',
				step: 2
			})
		}})
	}
	/* bt2 */
	/* bt3 */
	fnIni3 = () => {
    let bt = document.getElementById('bt3')
    TweenMax.to(bt, 0.8, {opacity: 1, onComplete: () => {
			this.props.dispatch({
				type: 'ANIMATE_STEP',
				step: 3
			})
		}})
	}
	/* bt2 */
  /* methods */
  render() {
    return (
      <div 
      className="menu-icons">
				<button id="bt1"></button>
				<button id="bt2"></button>
				<button id="bt3"></button>
			</div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
		aniStep: state.aniStep
  }
}

export default connect(mapStateToProps)(Menuicons)