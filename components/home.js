import {connect} from 'react-redux'
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button, ToastAndroid, TextInput, FlatList, BackHandler, Alert} from 'react-native';
import Header from './resources/header';
import PinchZoomView from 'react-native-pinch-zoom-view';

function Home(props){

  useEffect(() => {
    if(props.api_token  === ""){
      props.navigation.navigate('Auth')
    }
  }, [props.api_token]);

  /*const backAction = () => {
    Alert.alert("Quitter l'application", "Voulez-vous quitter l'application?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);*/
  const FullWidthImage = ({ uri }) => {
    const [ratio, setRatio] = useState(1);
    useEffect(() => {
      if (uri) {
        Image.getSize(uri, (width, height) => {
           setRatio(width / height);
        });
     }
    }, [uri]);
  
    return (
      <View>
        <Image
          style={{ width: '100%', height: undefined, aspectRatio: 1.3 }}
          resizeMode="cover"
          source={ require("../assets/hiver.webp")}
        />
        <Image
          style={{ width: '100%', height: undefined, aspectRatio: 1.3 }}
          resizeMode="cover"
          source={ require("../assets/Printemps.webp")}
        />
        <Image
          style={{ width: '100%', height: undefined, aspectRatio: 1.3 }}
          resizeMode="cover"
          source={ require("../assets/ete.webp")}
        />
      <Image
          style={{ width: '100%', height: undefined, aspectRatio: 1.3 }}
          resizeMode="cover"
          source={ require("../assets/automne.webp")}
      />
     </View>
   );
  };
  
    return(
      <View style={styles.container}>
        <Header navigation={props.navigation}/>
        

        <ScrollView contentContainerStyle={{paddingBottom: 50}}>
            <Text style={styles.titre}>Bienvenue {props.user_name}</Text>
            <FullWidthImage uri={""} />
        </ScrollView>
        
      </View>
    )

}

const styles = StyleSheet.create({
  titre:{
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'Maiandra GD',
    padding: 15,
    color: "#393738"
  },
  container: {
    backgroundColor: "white",
  },
  listeItem: {
    fontSize: 15,
    marginTop: 10,
  },
  image:{
    width: '100%',
    height: '100%',
  }
});

const mapStateToProps = (state) => {
  return {
    api_token: state.setApiToken.api_token,
    user_id: state.setApiToken.user_id,
    user_name : state.setApiToken.user_name,
    user_surname : state.setApiToken.user_surname,
    user_email : state.setApiToken.user_email
  }
}

export default connect(mapStateToProps)(Home)
