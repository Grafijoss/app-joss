import React, { Component } from 'react';
import * as PIXI from 'pixi.js';
// import PropTypes from 'prop-types';
import sequence  from '../assets/images/sprite.png';

class Face extends Component {
  /* estado */
  state = {
    prueba: 'jghugug ugiugug',
    pixi_cnt: null,
    container: PIXI.Container,
    TextureCache: PIXI.TextureCache,
    Stage: new PIXI.Container(),
    Renderer: PIXI.autoDetectRenderer(600, 600)
  }
  /* estado */
  /* methods */
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
    console.log((this.state.Renderer.width / 2) - (faceB.width / 2))
    faceB.position.x = (this.state.Renderer.width / 2) - (faceB.width / 2)
    faceB.position.y = (this.state.Renderer.height / 2) - (faceB.height / 2)
    this.state.Stage.addChild(faceB)

    // hair
    let hair = new PIXI.Sprite(this.frame(sequence, 408, 0, 408, 408))
    hair.position.x = (this.state.Renderer.width / 2) - (hair.width / 2)
    hair.position.y = (this.state.Renderer.height / 2) - (hair.height / 2)
    this.state.Stage.addChild(hair)

    //Circle
    let circle = new PIXI.Graphics()
    circle.beginFill(0x9966FF)
    circle.drawCircle(0, 0, 175)
    circle.endFill()
    console.log((this.state.Renderer.width / 2) - (circle.width))
    circle.position.x = (this.state.Renderer.width / 2)
    circle.position.y = (this.state.Renderer.height / 2)
    this.state.Stage.addChild(circle)

    this.state.Stage.mask = circle


    this.state.Renderer.render(this.state.Stage)
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
      console.log('La textura no existe')
    } else {
      console.log('Todo bien')
      imageFrame = new PIXI.Rectangle(x, y, w, h)
      texture.frame = imageFrame
      return texture
    }
  }
  /* methods */
  render() {
    return <div ref={this.updatePixiCnt} />
  }
}


export default Face;