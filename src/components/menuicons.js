import React, { Component } from 'react'
import { TweenMax } from 'gsap'
import { connect } from 'react-redux'

import icon1 from '../assets/images/ico1.png'
import icon2 from '../assets/images/ico2.png'
import icon3 from '../assets/images/ico3.png'
import IconMenu from './iconmenu'

class Menuicons extends Component {
  /* estado */
  state = {
  }
	/* estado */
	/* created */
  componentDidMount (prev_props, prev_state) {
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
				<button id="bt1">
					<IconMenu 
					image={icon1} 
					nameImage={'bt1'}
					prodsImage={[0, 0, 100, 100]} />
				</button>
				<button id="bt2">
					<IconMenu 
					image={icon2} 
					nameImage={'bt2'}
					prodsImage={[100, 0, 100, 100]} />
				</button>
				<button id="bt3">
					<IconMenu 
					image={icon3} 
					nameImage={'bt3'}
					prodsImage={[200, 0, 100, 100]} />
				</button>
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