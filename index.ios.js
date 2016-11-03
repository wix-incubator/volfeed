/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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
    return this.renderTheDarkSide()
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
