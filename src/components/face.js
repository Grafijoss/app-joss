import React, { Component } from 'react'
import * as PIXI from 'pixi.js'
import { TweenMax } from 'gsap'
import PixiPlugin from 'gsap/PixiPlugin'
// import PropTypes from 'prop-types'
import sequence  from '../assets/images/sprite.png'

let Sprites = {
	faceB: null,
	hair: null,
	eyes: null,
	shadow: null,
	glasses: null,
	circle: null
}

let Stage = new PIXI.Container()
let Stage1 = new PIXI.Container()
let Stage2 = new PIXI.Container()

class Face extends Component {
  /* estado */
  state = {
    pixi_cnt: null,
    container: PIXI.Container,
    TextureCache: PIXI.utils.TextureCache,
    Renderer: PIXI.autoDetectRenderer(450, 450, { transparent: true }),
    Mouse: {
      x: undefined,
			y: undefined,
			xeye: undefined,
			yeye: undefined,
			xhair: undefined,
      yhair: undefined
    }
  }
	/* estado */
	/* created */
  componentDidMount (prev_props, prev_state) {
		document.captureEvents(Event.MOUSEMOVE)
		document.onmousemove = this.getMouseXY
	}
	/* created */
	/* methods */
	getMouseXY = (e) => {
		let _this = this
		let tempX = e.pageX
		let tempY = e.pageY  
		if (tempX < 0) {tempX = 0}
		if (tempY < 0) {tempY = 0} 
		_this.setState({
			Mouse: {
				x: 10 + tempX / document.body.scrollWidth * 30,
				y: tempY / document.body.scrollHeight * 100,
				xeye: tempX / document.body.scrollWidth * 60,
				yeye: tempY / document.body.scrollHeight * 120,
				xhair: tempX / document.body.scrollWidth * 20,
				yhair: tempY / document.body.scrollHeight * 50
			}
		})
		return true
	}
  updatePixiCnt = (element) => {
    // the element is the DOM object that we will use as container to add pixi stage(canvas)
    this.pixi_cnt = element
    //now we are adding the application to the DOM element which we got from the Ref.
    if(this.pixi_cnt && this.pixi_cnt.children.length<=0) {
       this.pixi_cnt.appendChild(this.state.Renderer.view)
       //The setup function is a custom function that we created to add the sprites. We will this below
       this.setup()
    }
  }
  setup = () => {
    PIXI.loader
      .add('sequence', sequence)
      .load(this.initialize)
  }
  initialize = () => {
    // faceBackground
    let faceB = new PIXI.Sprite(this.frame(sequence, 0, 0, 408, 408))
    // console.log((this.state.Renderer.width / 2) - (faceB.width / 2))
    faceB.position.x = (this.state.Renderer.width / 2) - (faceB.width / 2)
    faceB.position.y = (this.state.Renderer.height / 2) - (faceB.height / 2)
    Stage1.addChild(faceB)

		// hair
    Sprites.hair = new PIXI.Sprite(this.frame(sequence, 408, 0, 408, 408))
    Sprites.hair.position.x = (this.state.Renderer.width / 2) - (Sprites.hair.width / 2)
		Sprites.hair.position.y = ((this.state.Renderer.height / 2) - (Sprites.hair.height / 2)) - 40
		Sprites.hair.vx = 0
    Sprites.hair.vy = 0
		Stage1.addChild(Sprites.hair)

		// eyes
    Sprites.eyes = new PIXI.Sprite(this.frame(sequence, 1224, 0, 408, 408))
    Sprites.eyes.position.x = (this.state.Renderer.width / 2) - (Sprites.eyes.width / 2)
    Sprites.eyes.position.y = ((this.state.Renderer.height / 2) - (Sprites.eyes.height / 2))
		Sprites.eyes.vx = 0
    Sprites.eyes.vy = 0
		Stage1.addChild(Sprites.eyes)
		
		// shadow
    Sprites.shadow = new PIXI.Sprite(this.frame(sequence, 816, 0, 408, 408))
    Sprites.shadow.position.x = (this.state.Renderer.width / 2) - (Sprites.shadow.width / 2)
    Sprites.shadow.position.y = (this.state.Renderer.height / 2) - (Sprites.shadow.height / 2)
    // Stage1.addChild(shadow)

    //Circle
    Sprites.circle = new PIXI.Graphics()
    Sprites.circle.beginFill(0x9966FF)
    Sprites.circle.drawCircle(0, 0, 175)
    Sprites.circle.endFill()
    // console.log((this.state.Renderer.width / 2) - (circle.width))
    Sprites.circle.position.x = (this.state.Renderer.width / 2)
    Sprites.circle.position.y = (this.state.Renderer.height / 2)
    Stage1.addChild(Sprites.circle)

		Stage1.mask = Sprites.circle
		// this.state.Renderer.render(Stage)

		// glasses
    Sprites.glasses = new PIXI.Sprite(this.frame(sequence, 1632, 0, 408, 408))
    Sprites.glasses.position.x = (this.state.Renderer.width / 2) - (Sprites.glasses.width / 2)
    Sprites.glasses.position.y = (this.state.Renderer.height / 2) - (Sprites.glasses.height / 2)
    Sprites.glasses.vx = 0
    Sprites.glasses.vy = 0
    Stage2.addChild(Sprites.glasses)

		Stage.addChild(Stage1)
		Stage.addChild(Stage2)

		this.state.Renderer.render(Stage)
		
		let loop = this.fnLoop 
    
    loop()
		
  }
  frame = (origin,x,y,w,h) => {
    let texture = null
    let imageFrame = null
    if (typeof origin === 'string') {
      if (this.state.TextureCache[origin]) {
        texture = new PIXI.Texture(this.state.TextureCache[origin])
      }
    } else if (origin instanceof PIXI.Texture) {
      texture = new PIXI.Texture(origin)
    }
    if (!texture) {
      // console.log('La textura no existe')
    } else {
      // console.log('Todo bien')
      imageFrame = new PIXI.Rectangle(x, y, w, h)
      texture.frame = imageFrame
      return texture
    }
  }

  /* loop */
  fnLoop = () => {
    requestAnimationFrame(this.fnLoop)
		if (this.state.Mouse.x) TweenMax.to(Sprites.glasses.position, 0.5, {x:this.state.Mouse.x, y:this.state.Mouse.y})
		if (this.state.Mouse.xeye) TweenMax.to(Sprites.eyes.position, 0.3, {x:this.state.Mouse.xeye, y:this.state.Mouse.yeye - 20})
		if (this.state.Mouse.xhair) TweenMax.to(Sprites.hair.position, 0.5, {x:this.state.Mouse.xhair, y:this.state.Mouse.yhair - 50})

    this.state.Renderer.render(Stage)
  }
  /* loop */
  /* methods */
  render() {
    return (
      <div 
      ref={this.updatePixiCnt}
      className="my-face" />
    )
  }
}


export default Face