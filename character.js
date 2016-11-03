import React, { Component, PropTypes } from 'react';
import {observer} from 'mobx-react/native';
import Matter from 'matter-js';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Alert,
  TouchableOpacity
} from 'react-native';
import {Loop, Stage, World, Body, Sprite} from 'react-game-kit/native';
import autobind from 'react-autobind';

@observer
export default class Character extends Component {

  static propTypes = {
    keys: PropTypes.object,
    onEnterBuilding: PropTypes.func,
    store: PropTypes.object,
  };

  static contextTypes = {
    engine: PropTypes.object,
    scale: PropTypes.number,
  };

  handlePlayStateChanged = (state) => {
    this.setState({
      spritePlaying: state ? true : false,
    });
  };

  move = (body, x) => {
    Matter.Body.setVelocity(body, { x, y: 0 });
  };

  jump = () => {
    const {body} = this.body;
    this.isJumping = true;
    Matter.Body.applyForce(
      body,
      { x: 0, y: 0 },
      { x: 0, y: -0.15 },
    );
    Matter.Body.set(body, 'friction', 0.0001);
  };

  update = () => {
    const { store } = this.props;
    const { body } = this.body;

    const midPoint = Math.abs(store.stageX) + 448;

    const shouldMoveStageLeft = body.position.x < midPoint && store.stageX < 0;
    const shouldMoveStageRight = body.position.x > midPoint && store.stageX > -2048;

    const velY = parseFloat(body.velocity.y.toFixed(10));

    if (velY === 0) {
      this.isJumping = false;
      Matter.Body.set(body, 'friction', 0.9999);
    }

    if (!this.isJumping && !this.isPunching && !this.isLeaving) {
      // gamepad.update();

      // this.checkKeys(shouldMoveStageLeft, shouldMoveStageRight);

      store.setCharacterPosition(body.position);
    } else {
      if (this.isPunching && this.state.spritePlaying === false) {
        this.isPunching = false;
      }

      const targetX = store.stageX + (this.lastX - body.position.x);
      if (shouldMoveStageLeft || shouldMoveStageRight) {
        store.setStageX(targetX);
      }
    }

    this.lastX = body.position.x;
  };

  constructor(props) {
    super(props);

    this.loopID = null;
    this.isJumping = false;
    this.isPunching = false;
    this.isLeaving = false;
    this.lastX = 0;

    autobind(this);

    this.state = {
      characterState: 2,
      loop: false,
      spritePlaying: true,
    };
  }

  componentDidMount() {
    Matter.Events.on(this.context.engine, 'afterUpdate', this.update);
  }

  componentWillUnmount() {
    Matter.Events.off(this.context.engine, 'afterUpdate', this.update);
  }

  getWrapperStyles() {
    const { characterPosition, stageX } = this.props.store;
    const { scale } = this.context;
    const { x, y } = characterPosition;
    const targetX = x + stageX;

    return {
      position: 'absolute',
      left: targetX * scale,
      top: 300 - (y * scale)
    };
  }

  render() {
    // const x = this.props.store.characterPosition.x;

    return (
      <TouchableOpacity onPress={this.jump}>
        <View style={this.getWrapperStyles()}>
          <Body
            args={[0, 384, 1000, 64]}
            inertia={Infinity}
            ref={(b) => { this.body = b; }} >
          <Sprite
            repeat={true}
            src={require('./images/character.png')}
            scale={1}
            state={1}
            steps={[9, 9, 0, 4, 5]}
          />
          </Body>
        </View>
      </TouchableOpacity>
    );
  }
}