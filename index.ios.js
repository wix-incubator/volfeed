import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Alert
} from 'react-native';
import {Loop, Stage, World, Body, Sprite} from 'react-game-kit/native';

export default class volfeed extends Component {
  constructor(props) {
    super(props);
    this.state = {gameMode: false};
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
    if (!this.state.gameMode) {
      return this.renderOneApp()
    }
    return this.renderGame()
  }

  renderGame() {
    return (
      <Loop>
        <Stage width={1024} height={576}>
          <World>
            <Body>
            <Sprite
              repeat={true}
              src={require('./images/character-sprite.png')}
              scale={this.context.scale * 2}
              state={0}
              steps={[9, 9, 0, 4, 5]}
            />
            </Body>
          </World>
        </Stage>
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
