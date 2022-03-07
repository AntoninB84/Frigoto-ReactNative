import React, { useEffect, useState }  from 'react'
import {
  View, TextInput, Button, StyleSheet, Text, ToastAndroid
} from 'react-native'
import {signIn} from '../../API/Auth.js'
import {connect, useDispatch} from 'react-redux'

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
          <View style={styles.form}>
            <Text style={styles.title}>
              Connectez-vous à votre cuisine !
            </Text>
            <TextInput
              placeholder='Adresse email'
              autoComplete='email'
              keyboardType='email-address'
              style={styles.input}
              onChangeText={(text) => _emailChanged(text)}
            />
            <TextInput
              placeholder='Mot de passe'
              secureTextEntry={true}
              style={styles.input}
              onChangeText={(text) => _passwordChanged(text)}
            />
            <Button
              title='Se connecter'
              style={styles.button}
              onPress={() => _sendSignInRequest()}
            />
          </View>
          <Button
            title="S'inscrire"
            style={styles.button}
            onPress={() => _displaySignUp()}
          />
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
    padding: 10
  },
  form: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50
  },
  title:{
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 50
  },
  input: {
    width:250,
    borderBottomColor: '#00000030',
    borderBottomWidth: 1,
    padding: 5,
    marginTop: 30,
    marginBottom: 20
  },
  button: {
    marginTop: 50
  }
});
