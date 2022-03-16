import { BackgroundColor } from 'chalk';
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

export default function Header(props){

    const onHamburgerClick = () => {
        props.navigation.openDrawer()
    }

    return(
        <View style={styles.container}>
            <TouchableOpacity
                onPress={onHamburgerClick}
            >
                <Image 
                    style={styles.burger}
                    source={require('../../assets/header/burger.png')}
                />
            </TouchableOpacity>
            <Text style={styles.title}>frigoto</Text>
            <Image 
                style={styles.logo}
                source={require('../../assets/frigoto.png')}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor : "#df4c4c",
      paddingVertical: 5,
      paddingHorizontal: 15,
      height: 50,
    },
    burger: {
        tintColor: 'white',
        width: 30,
        height: 30,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: "uppercase",
        letterSpacing: 5,
        color: 'white',
    },
    logo:{
        width: 40,
        height: 40
    }
  });