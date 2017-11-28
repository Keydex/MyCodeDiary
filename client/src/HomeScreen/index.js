import React, { Component } from "react";
import Home from "./Home.js";
import NewEntry from "./NewEntry.js";
import ViewScreen from "./ViewScreen.js";

import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
  Home: { screen: Home },
  NewEntry: { screen: NewEntry },
  ViewScreen: { screen: ViewScreen}
}));
