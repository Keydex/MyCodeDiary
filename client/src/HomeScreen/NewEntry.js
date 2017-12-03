import React from "react";
import { Text, Container, Card, CardItem, Body, Content, Header, Left, Right, Icon, Title, Button } from "native-base";
import {Main_styles as styles} from './../../Styles/App_styles';

export default class NewEntry extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header >
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>New Entry</Title>
        </Body>
        <Right />
      </Header>
    )
  });
  render() {
    return (
      <Container>
        <Content padder >
          <Text>Code:</Text>
          <Card>
            <CardItem>
              <Text>Code Placeholder</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Text>Select Language</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Text>Add Comments</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Text>Select Tags</Text>
            </CardItem>
          </Card>
          <Button
            full
            rounded
            primary
            style={{ marginTop: 10 }}
            onPress={() => this.props.navigation.navigate("Profile")}
          >
            <Text>Submit</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
