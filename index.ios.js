/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

export default class volfeed extends Component {
  render() {
    return (
      <Image
        style={{width: null, height: null, flex: 1}}
        source={require('./images/oneapp.png')}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1
  }
});

AppRegistry.registerComponent('volfeed', () => volfeed);
