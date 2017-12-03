import React from "react";
import { AppRegistry, Image, StatusBar } from "react-native";
import { Button, Text, Container, List, ListItem, Content, Icon } from "native-base";
import {Main_styles as styles} from './../../Styles/App_styles';

const routes = ["Login", "Home"];

export default class SideBar extends React.Component {
  render() {
    return (
      <Container>
        <Content style={styles.bodyStyle}>
          <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data)}
                >
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}
