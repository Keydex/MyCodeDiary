import React, { Component } from "react";
import Login from "./LoginScreen.js";
import Home from "../HomeScreen/index.js";
import SideBar from "../SideBar/SideBar.js";
import { DrawerNavigator } from "react-navigation";

const HomeScreenRouter = DrawerNavigator(
  {
    Login: { screen: Login },
    Home: { screen: Home }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default HomeScreenRouter;
