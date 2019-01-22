import React, { Component } from 'react'
import * as PIXI from 'pixi.js'
// import PropTypes from 'prop-types'
import sequence  from '../assets/images/sprite.png'

class Face extends Component {
  /* estado */
  state = {
    prueba: 'jghugug ugiugug',
    pixi_cnt: null,
    container: PIXI.Container,
    TextureCache: PIXI.TextureCache,
		Stage: new PIXI.Container(),
		Stage1: new PIXI.Container(),
		Stage2: new PIXI.Container(),
    Renderer: PIXI.autoDetectRenderer(450, 450, { transparent: true }),
    Mouse: {
      x: undefined,
			y: undefined,
			xeye: undefined,
			yeye: undefined,
			xhair: undefined,
      yhair: undefined
    },
    Sprites: {
      faceB: null,
      hair: null,
      eyes: null,
      shadow: null,
      glasses: null
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
    //We will create a sprite and then add it to stage and (0,0) position
    // this.faceBack = new PIXI.Sprite(PIXI.loader.resources['faceBack'].texture)

    // faceBackground
    let faceB = new PIXI.Sprite(this.frame(sequence, 0, 0, 408, 408))
    // console.log((this.state.Renderer.width / 2) - (faceB.width / 2))
    faceB.position.x = (this.state.Renderer.width / 2) - (faceB.width / 2)
    faceB.position.y = (this.state.Renderer.height / 2) - (faceB.height / 2)
    this.state.Stage1.addChild(faceB)

    // hair
    this.state.Sprites.hair = new PIXI.Sprite(this.frame(sequence, 408, 0, 408, 408))
    this.state.Sprites.hair.position.x = (this.state.Renderer.width / 2) - (this.state.Sprites.hair.width / 2)
		this.state.Sprites.hair.position.y = ((this.state.Renderer.height / 2) - (this.state.Sprites.hair.height / 2)) - 40
		this.state.Sprites.hair.vx = 0
    this.state.Sprites.hair.vy = 0
		this.state.Stage1.addChild(this.state.Sprites.hair)

		// eyes
    this.state.Sprites.eyes = new PIXI.Sprite(this.frame(sequence, 1224, 0, 408, 408))
    this.state.Sprites.eyes.position.x = (this.state.Renderer.width / 2) - (this.state.Sprites.eyes.width / 2)
    this.state.Sprites.eyes.position.y = ((this.state.Renderer.height / 2) - (this.state.Sprites.eyes.height / 2)) + 40
		this.state.Sprites.eyes.vx = 0
    this.state.Sprites.eyes.vy = 0
		this.state.Stage1.addChild(this.state.Sprites.eyes)
		
		// shadow
    let shadow = new PIXI.Sprite(this.frame(sequence, 816, 0, 408, 408))
    shadow.position.x = (this.state.Renderer.width / 2) - (shadow.width / 2)
    shadow.position.y = (this.state.Renderer.height / 2) - (shadow.height / 2)
    // this.state.Stage1.addChild(shadow)

    //Circle
    let circle = new PIXI.Graphics()
    circle.beginFill(0x9966FF)
    circle.drawCircle(0, 0, 175)
    circle.endFill()
    // console.log((this.state.Renderer.width / 2) - (circle.width))
    circle.position.x = (this.state.Renderer.width / 2)
    circle.position.y = (this.state.Renderer.height / 2)
    this.state.Stage1.addChild(circle)

		this.state.Stage1.mask = circle
		// this.state.Renderer.render(this.state.Stage)

		// glasses
    this.state.Sprites.glasses = new PIXI.Sprite(this.frame(sequence, 1632, 0, 408, 408))
    this.state.Sprites.glasses.position.x = (this.state.Renderer.width / 2) - (this.state.Sprites.glasses.width / 2)
    this.state.Sprites.glasses.position.y = (this.state.Renderer.height / 2) - (this.state.Sprites.glasses.height / 2)
    this.state.Sprites.glasses.vx = 0
    this.state.Sprites.glasses.vy = 0
    this.state.Stage2.addChild(this.state.Sprites.glasses)

		this.state.Stage.addChild(this.state.Stage1)
		this.state.Stage.addChild(this.state.Stage2)

    this.state.Renderer.render(this.state.Stage)
    
    this.loop()
		

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
  loop = () => {
    requestAnimationFrame(this.loop)
    this.state.Sprites.glasses.vx = 2
    this.state.Sprites.glasses.vy = 2
		this.state.Sprites.glasses.x = this.state.Mouse.x
		this.state.Sprites.glasses.y = this.state.Mouse.y
		this.state.Sprites.eyes.vx = 3
    this.state.Sprites.eyes.vy = 3
		this.state.Sprites.eyes.x = this.state.Mouse.xeye
		this.state.Sprites.eyes.y = this.state.Mouse.yeye - 20
		this.state.Sprites.hair.vx = 1
    this.state.Sprites.hair.vy = 1
		this.state.Sprites.hair.x = this.state.Mouse.xhair
		this.state.Sprites.hair.y = this.state.Mouse.yhair - 50
    this.state.Renderer.render(this.state.Stage)
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