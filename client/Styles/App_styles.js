/* eslint no-unused-vars: 0 */

import {StyleSheet, StatusBar} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export const Main_styles = {
    bodyStyle: {
      flex: 1,
      marginTop: StatusBar.currentHeight
    },
    titleStyle: {
      fontSize: 32,
      fontWeight: '500',
      textAlign: 'center',
      color: '#f5f5f1'
    },
    inputBoxStyle: {
      height: 40,
      textAlign: 'center',
      color: '#FFFFFF'
    },
    imageStyle: {
      height: 120,
      width: 120
    },
    itemStyle: {
      color: 'white'
    }
}
