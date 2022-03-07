import {connect} from 'react-redux'
import React, { useEffect, useContext } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';

function AuthLoading(props){

  useEffect(() => {
    props.navigation.navigate(props.api_token ? 'App' : 'Auth');
  }, [])

  return(
    <View>
      <ActivityIndicator/>
      <StatusBar barStyle="default"/>
    </View>
  )

}
const mapStateToProps = (state) => {
  return {
    api_token: state.setApiToken.api_token
  }
}

export default connect(mapStateToProps)(AuthLoading)
