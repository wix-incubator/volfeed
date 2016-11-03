import React, {Component, PropTypes} from 'react';
import {observer} from 'mobx-react/native';
import Matter from 'matter-js';
import GameStore from './stores/game-store';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Alert,
  TouchableWithoutFeedback
} from 'react-native';
import {Loop, Stage, World, Body, Sprite} from 'react-game-kit/native';
import autobind from 'react-autobind';
import Character from './character'


export default class volfeed extends Component {
  constructor(props) {
    super(props);
    this.state = {gameMode: false};
    autobind(this);
  }

  static propTypes = {
    store: PropTypes.object,
  };

  static contextTypes = {
    engine: PropTypes.object,
    scale: PropTypes.number,
  };

  physicsInit = (engine) => {
    const ground = Matter.Bodies.rectangle(
      512 * 3, 448,
      1024 * 3, 64,
      {
        isStatic: true,
      },
    );

    const leftWall = Matter.Bodies.rectangle(
      -64, 288,
      64, 576,
      {
        isStatic: true,
      },
    );

    const rightWall = Matter.Bodies.rectangle(
      3008, 288,
      64, 576,
      {
        isStatic: true,
      },
    );

    Matter.World.addBody(engine.world, ground);
    Matter.World.addBody(engine.world, leftWall);
    Matter.World.addBody(engine.world, rightWall);
  }

  renderOneApp() {
    return (
      <TouchableHighlight style={{flex: 1}} onPress={() => this.setState({gameMode: true})}>
        <Image
          style={{width: null, height: null, flex: 1}}
          source={require('./images/oneapp.png')}
        />
      </TouchableHighlight>
    );
  }

  renderTheDarkSide() {
    return (
      <Image
        style={{width: null, height: null, flex: 1}}
        source={require('./images/oneappBlack.png')}
      />
    );
  }

  renderCorrectImage() {
    // if (!this.state.gameMode) {
    //   return this.renderOneApp()
    // }
    return this.renderGame()
  }

  onTap() {
    GameStore.jumping = true;
  }

  renderGame() {
    return (
      <TouchableWithoutFeedback onPress={this.onTap}>
        <View>
        <Loop>
          <Stage width={1024} height={576} style={{backgroundColor: '#CCC'}}>
            <World onInit={this.physicsInit}>
              <Character store={GameStore}/>
            </World>
          </Stage>
        </Loop>
          </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    return (
      this.renderCorrectImage()
    );
  }
}

AppRegistry.registerComponent('volfeed', () => volfeed);
