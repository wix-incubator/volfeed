import React, { Component, PropTypes } from 'react';
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
  TouchableOpacity
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

  renderGame() {
    return (
      <Loop>
        <TouchableOpacity onPress={this.onTap}>
        <Stage width={1024} height={576} style={{backgroundColor: '#CCC'}}>

            <World>
              <Character store={GameStore} />
            </World>

        </Stage>
        </TouchableOpacity>
      </Loop>
    );
  }

  render() {
    return (
      this.renderCorrectImage()
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1
  }
});

AppRegistry.registerComponent('volfeed', () => volfeed);
