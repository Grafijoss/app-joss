import React, { Component } from 'react'
import { TweenMax, TweenLite, Bounce } from 'gsap'
import { connect } from 'react-redux'
// import icon1 from '../assets/images/ico1.png'
// import icon2 from '../assets/images/ico2.png'
// import icon3 from '../assets/images/ico3.png'
// import IconMenu from './iconmenu'

class Menuicons extends Component {
  /* estado */
  state = {
  }
	/* estado */
	/* created */
  componentDidMount (prev_props, prev_state) {
		const _this = this
		setTimeout(() => {
			_this.fnIni1()
		}, 1500)
	}
	/* created */
	/* methods */
	/* bt1 */
	fnIni1 = () => {
		let bt = document.getElementById('bt1')
		let cover = bt.getElementsByClassName('cover')
		let icon = bt.getElementsByTagName('i')
		TweenLite.to(cover, 0.6, { ease: Bounce.easeOut, height: '100%', width: '100%', top: 0, left: 0 })
    TweenLite.to(icon, 0.3, { css: {opacity: 1}, delay: 0.4, onComplete: () => {
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
		let cover = bt.getElementsByClassName('cover')
		let icon = bt.getElementsByTagName('i')
		TweenLite.to(cover, 0.6, { ease: Bounce.easeOut, height: '100%', width: '100%', top: 0, left: 0 })
    TweenLite.to(icon, 0.3, { css: {opacity: 1}, delay: 0.4, onComplete: () => {
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
		let cover = bt.getElementsByClassName('cover')
		let icon = bt.getElementsByTagName('i')
		TweenLite.to(cover, 0.6, { ease: Bounce.easeOut, height: '100%', width: '100%', top: 0, left: 0 })
    TweenLite.to(icon, 0.3, { css: {opacity: 1}, delay: 0.4, onComplete: () => {
			this.props.dispatch({
				type: 'ANIMATE_STEP',
				step: 3
			})
			setTimeout(() => {
				this.props.dispatch({type: 'ANIMATE_STEP', step: 4})
			}, 2000)
		}})
	}
	/* bt2 */
  /* methods */
  render() {
    return (
      <div 
      className="menu-icons">
				<button id="bt1">
					<span className="cover"></span>
					<i className="fas fa-user-ninja"></i>
				</button>
				<button id="bt2">
					<span className="cover"></span>
					<i className="fas fa-file-code"></i>
				</button>
				<button id="bt3">
					{/* <IconMenu 
					image={icon3} 
					nameImage={'bt3'}
					prodsImage={[200, 0, 100, 100]} /> */}
					<span className="cover"></span>
					<i className="far fa-comment"></i>
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