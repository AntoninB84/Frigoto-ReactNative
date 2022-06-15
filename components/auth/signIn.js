import React, { useEffect, useState }  from 'react'
import {
  View, KeyboardAvoidingView, Keyboard, Dimensions, Image, ImageBackground, TextInput, Button, StyleSheet, Text, ToastAndroid
} from 'react-native'
import {signIn} from '../../API/Auth.js'
import {connect, useDispatch} from 'react-redux'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'

function SignIn (props){

  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    if(props.api_token !== ""){
      props.navigation.navigate('App')
    }
  }, [props.user_id]);

    const _emailChanged = (text) => {
      setEmail(text)
    }
    const _passwordChanged = (text) => {
      setPassword(text)
    }
    const _sendSignInRequest = () => {
      if (email.length > 0 && password.length > 0) {
        signIn(email, password).then(data => {
          if(data.accessToken){
            dispatch({ type: "SET_API_TOKEN", value: data.accessToken })
            dispatch({ type: "SET_USER_ID", value: data.id})
            dispatch({ type: "SET_USER_NAME", value: data.name})
            dispatch({ type: "SET_USER_SURNAME", value: data.surname})
            dispatch({ type: "SET_USER_EMAIL", value: data.email})
          }else{
            ToastAndroid.show(data.message, ToastAndroid.LONG);
          }
        })
      }
    }

    const _displaySignUp = () => {
      props.navigation.navigate('SignUp')
    }

      return(
        <View style={styles.main_container}>
          <ImageBackground            
            source={require('../../assets/Photo_Accueil.png')}
            resizeMode='cover'
            style={styles.backgroundImage}>
          <View style={styles.header}>
              <Text style={styles.headerTitle}>Frigoto</Text>
          </View>
          <KeyboardAvoidingView
            behavior= "height"
            style={styles.main_container}>
          <View style={styles.form}>
          <TouchableWithoutFeedback style={styles.main_container} onPress={Keyboard.dismiss}>
          <View style={[styles.center, styles.column]}>
                <Image  
                    source={require("../../assets/frigoto.png")}
                    style={styles.logo}
                />
              <Text style={styles.title}>Frigoto</Text>
          </View>
          <View style={styles.column}>
            <View style={styles.inputContainer}>
            <Image
              source={require('../../assets/mail.png')}
              style={styles.inputImage}
              resizeMode='contain'/>
              <TextInput
                placeholderTextColor="#FF5757"
                placeholder='Adresse email'
                autoComplete='email'
                keyboardType='email-address'
                style={styles.input}
                onChangeText={(text) => _emailChanged(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Image
                  source={require('../../assets/key.png')}
                  style={styles.inputImage}
                  resizeMode='contain'/>
              <TextInput
                placeholderTextColor="#FF5757"
                placeholder='Mot de passe'
                secureTextEntry={true}
                style={styles.input}
                onChangeText={(text) => _passwordChanged(text)}
              />
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => _sendSignInRequest()}>
                <Text style={styles.signIn}>Connexion</Text>
              </TouchableOpacity>
            </View>
            </TouchableWithoutFeedback>
          </View>
  
          </KeyboardAvoidingView>
          </ImageBackground>
        </View>
      )

}


const mapStateToProps = (state) => {
  return {
    api_token: state.setApiToken.api_token,
    user_id: state.setApiToken.user_id,
    user_name : state.setApiToken.user_name,
    user_surname : state.setApiToken.user_surname,
    user_email : state.setApiToken.user_email
  }
}

export default connect(mapStateToProps)(SignIn)

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  backgroundImage:{
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  center:{
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
    header:{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor : "#df4c4c",
      paddingVertical: 5,
      paddingHorizontal: 15,
      height: 50,
  },
  headerTitle:{
    fontSize: 20,
    textTransform: "uppercase",
    fontFamily: 'Maiandra GD',
    letterSpacing: 5,
    color: 'white',
  },
  form: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    justifyContent: "space-around",
  },
  logo:{
  },
  column:{
    flex: 1,
    alignItems: 'center',
    flexDirection: "column"
  },
  title:{
    textAlign: 'center',
    color: '#FF5757',
    fontFamily: 'Maiandra GD',
    fontSize: 50,
    marginBottom: 20,
  },
  inputContainer:{
    width: 300,
    textAlign: 'center',
    alignItems:'center',
    paddingLeft: 20,
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 100,
    borderColor: '#FF5757',
    marginBottom: 10,
    flexDirection:'row',
  },
  input: {
    width: "65%",
    padding: 18,
    color:'#FF5757',
    textAlign: 'center',
    fontFamily: 'Poppins-Medium'
  },
  inputImage:{
    aspectRatio: 1,
    width: 40,
  },
  button: {
    width: 250,
    padding: 15,
    backgroundColor: '#FF5757',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: '#FF5757',
  },
  signIn:{
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 17,
    color: 'white',
}
});
