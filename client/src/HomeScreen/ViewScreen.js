import React from "react";
import { Text, Container, Card, CardItem, Body, Content, Header, Left, Right, Icon, Title, Button } from "native-base";
import {Main_styles as styles} from './../../Styles/App_styles';

export default class ViewScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>ForLoop</Title>
        </Body>
        <Right />
      </Header>
    )
  });
  render() {
    return (
      <Container>
        <Content padder>
          <Text>Code: Python</Text>
          <Card>
            <CardItem>
              <Text>Code Placeholder</Text>
            </CardItem>
          </Card>
          <Text>Comments:</Text>
          <Card>
            <CardItem>
              <Text>Comments Placeholder</Text>
            </CardItem>
          </Card>
          <Text>Tags:</Text>
          <Card>
            <CardItem>
              <Text>Tags Placeholder</Text>
            </CardItem>
          </Card>

          {/* TODO: implement built in share instead of making a separate share component, Share button is not fully functional */}
          <Button
            full
            rounded
            primary
            style={{ marginTop: 10 }}
            onPress={() => this.props.navigation.navigate("Share")}
          >
            <Text>Share</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
