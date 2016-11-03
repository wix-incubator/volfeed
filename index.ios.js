import React, {Component, PropTypes} from 'react';
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
      gameMode: 'notStarted',
      gameStarted: false
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
      <TouchableHighlight style={{flex: 1}} onPress={() => this.setState({gameMode: 'showStart'})}>
        <Image
          style={{width: null, height: null, flex: 1}}
          source={require('./images/bg1.png')}
        />
      </TouchableHighlight>
    );
  }

  renderMusaStart() {
    return (
      <TouchableHighlight style={{flex: 1}} onPress={() => this.setState({gameMode: 'showInstructions'})}>
        <Image
          style={{width: null, height: null, flex: 1}}
          source={require('./images/musaStart.png')}
        />
      </TouchableHighlight>
    );
  }

  renderMusaInstructions() {
    return (
      <TouchableHighlight style={{flex: 1}} onPress={() => this.setState({gameStarted: true})}>
        <Image
          style={{width: null, height: null, flex: 1}}
          source={require('./images/musaInstructions.png')}
        />
      </TouchableHighlight>
    );
  }

  renderCorrectImage() {
    if (this.state.gameMode === 'notStarted') {
      return this.renderOneApp()
    } else if (this.state.gameMode === 'showStart' && !this.state.gameStarted) {
      return this.renderMusaStart()
    } else if (this.state.gameMode === 'showInstructions' && !this.state.gameStarted) {
      return this.renderMusaInstructions()
    }
    return this.renderGame();
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
              source={require('./images/gameBKG.png')}
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
          <View style={{position: 'absolute'}}>
            <Image
              style={{width: 500, height: 700,  resizeMode: 'stretch'}}
              source={require('./images/animation.gif')}
            />
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
