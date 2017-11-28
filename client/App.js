import React, { Component } from "react";
import Expo from "expo";

import LoginScreen from "./src/LoginScreen/index.js";

/* Reference: http://docs.nativebase.io/docs/examples/navigation/StackNavigationExample.html */
export default class AwesomeApp extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }

  /* Function that makes sure all fonts are loaded before launching the application */
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf")
    });
    this.setState({ isReady: true });
  }

  /* Homescreen is displayed when the app is ready loading all fonts */
  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return <LoginScreen />;
  }
}
