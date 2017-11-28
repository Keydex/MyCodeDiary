import React from "react";
import { StatusBar } from "react-native";
import { Button, Text, Container, Card, CardItem, Body, Content, Header, Title, Left, Icon, Right } from "native-base";
import {Main_styles as styles} from './../../Styles/App_styles';

export default class LoginScreen extends React.Component {
  render() {
    return (
      <Container style={styles.bodyStyle}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Code Diary</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Card>
            <CardItem>
              <Text>Username Placeholder</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Text>Password Placeholder</Text>
            </CardItem>
          </Card>
          <Button
            full
            rounded
            primary
            style={{ marginTop: 10 }}
            onPress={() => this.props.navigation.navigate("Home")}
          >
            <Text>Login</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
