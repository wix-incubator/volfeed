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
      <View style={styles.container}>
          <Image
            style={{width: 300, height: 1334}}
            source={require('./img/oneapp.png')}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('volfeed', () => volfeed);
