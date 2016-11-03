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
    this.state = {
      gameMode: false,
      gameStarted: true
    };
    autobind(this);
  }

  physicsInit = (engine) => {
    const ground = Matter.Bodies.rectangle(
      1, 1, 1, 1,
      {
        isStatic: true,
      },
    );

    Matter.World.addBody(engine.world, ground);
  };

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
    if (!this.state.gameMode) {
      return this.renderOneApp()
    }
    return this.renderGame()
  }

  onTap() {
    GameStore.jumping = true;
  }

  renderGame() {
    return (
      <TouchableWithoutFeedback onPress={this.onTap}>
        <View style={{flex: 1}}>
          <View style={{position: 'absolute'}}>
            <Image
              style={{width: 750, height: 1334, resizeMode: 'repeat'}}
              source={require('./images/bg1.png')}
            />
          </View>
          <View >
            <Loop >
              <Stage width={750} height={1334}>
                <World onInit={this.physicsInit}>
                  <Character store={GameStore}/>
                </World>
              </Stage>
            </Loop>
          </View>
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
