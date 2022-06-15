import React from 'react';
import { ImageBackground, View, Text, Image, Button, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';

export default function Accueil(props) {



    return(
        <View style={{flex: 1}}>
        <ImageBackground            
            source={require('../../assets/Photo_Accueil.png')}
            resizeMode='cover'
            style={styles.backgroundImage}>         

        <View style={styles.header}>
            <Text style={styles.headerTitle}>Frigoto</Text>
        </View>
        <View style={styles.center}>
            <Image  
                source={require("../../assets/frigoto.png")}
                style={styles.logo}
            />
        </View>
        <Text style={styles.title}>Frigoto</Text>
        <View style={styles.center}>
            <TouchableOpacity
                title=""
                style={[styles.button1, styles.signIn]}
                onPress={() => props.navigation.navigate("SignIn")}>
                    <Text style={styles.signIn}>Se connecter</Text>
                </TouchableOpacity>
        </View>
        <View style={styles.center}>
            <TouchableOpacity
                title=""
                style={[styles.button2, styles.signUp]}
                onPress={() => props.navigation.navigate("SignUp")}>
                    <Text style={styles.signUp}>S'inscrire</Text>
                </TouchableOpacity>
        </View>
        </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    center:{
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    backgroundImage:{
        flex: 1,
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
    logo:{
        marginTop: 50,
    },
    title:{
        textAlign: 'center',
        color: '#FF5757',
        fontFamily: 'Maiandra GD',
        fontSize: 50,
        marginBottom: 50,
    },  
    button1:{
        width: 300,
        padding: 18,
        backgroundColor: '#FFFFFF',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 100,
        borderColor: '#FF5757',
        marginBottom: 20,
    },
    button2:{
        width: 300,
        padding: 18,
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
        color: '#FF5757',
        
    },
    signUp:{
        fontFamily: 'Poppins-Medium',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 17,
        color: 'white',
    }
})