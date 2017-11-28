import React from "react";
import { Text, Container, Card, CardItem, Body, Content, Header, Item, Input, Left, Right, Icon, Title, Button } from "native-base";
import { StackNavigator } from "react-navigation";
import {Main_styles as styles} from './../../Styles/App_styles';

export default class Home extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.navigate("DrawerOpen")}>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>Home</Title>
        </Body>
        <Right />
      </Header>
    )
  });
  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
            <Icon name="ios-mic" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Content padder>
          <Button
            full
            rounded
            primary
            style={{ marginTop: 10, marginBottom: 10, backgroundColor: 'green' }}
            onPress={() => this.props.navigation.navigate("NewEntry")}
          >
            <Text>Add New Entry</Text>
          </Button>

          <Text>Python:</Text>

          <Button
            full
            rounded
            primary
            style={{ marginTop: 10 }}
            onPress={() => this.props.navigation.navigate("ViewScreen")}
          >
            <Text>ForLoop</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}