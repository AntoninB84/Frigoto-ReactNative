import React from 'react';
import { 
    StyleSheet, 
    Text,
    TextInput, 
    View, 
    FlatList, 
    TouchableWithoutFeedback, 
    TouchableOpacity, 
    Image
} from 'react-native';

export default function ProductList(props){

    return(
        <FlatList
            data={props.listeProduits}
            numColumns={3}
            style={styles.liste}
            contentContainerStyle={{ paddingBottom: 80 }} 
            keyExtractor={(item, index) => item.id}
            ListEmptyComponent={() => {
              return (
              <Text style={styles.emptyMessage}>
                {props.emptyMessage}
              </Text>
              )
            }}
            renderItem={({item, index}) =>
              <TouchableWithoutFeedback
              >
                <View style={styles.listeItemContainer}>
                  <Image 
                    style={styles.listeItemImage}
                    source={require('../../assets/frigoto.png')}
                  />
                  <Text style={styles.listeItemName}>{item.nom}</Text>
                  <View style={styles.listeQuantityLine}>
                    <TouchableOpacity
                      onPress={() => {props.boutonMoins(item.id, index)}}
                    >
                      <Image
                        style={styles.listeItemIcons}
                        source={require('../../assets/moins.png')}
                      />
                    </TouchableOpacity>
                    <TextInput 
                      style={styles.quantity}
                      editable={props.editable}
                      keyboardType="number-pad"
                      underlineColorAndroid={props.editable ? 'grey' : 'transparent'}
                    >
                      {item.inventaire_produit.quantite}
                    </TextInput>
                    <TouchableOpacity
                      onPress={() => {props.boutonPlus(item.id, index)}}
                    >
                      <Image
                        style={styles.listeItemIcons}
                        source={require('../../assets/plus.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            }
          />
    )
}

const styles = StyleSheet.create({ 
  liste:{
    padding: 10,
    paddingBottom: 100,
  },
  listeItemContainer:{
    borderColor: 'red',
    borderRadius: 10,
    borderWidth: 1,
    padding: 1,
    margin: '1.67%',
    width: '30%',
  },
  listeItemName: {
    fontSize: 10,
    textAlign: 'center',
    padding: 2,
    color: "red"
  },
  listeItemImage:{
    backgroundColor: "white",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    width: '100%',
    height: 100,
  },
  listeQuantityLine:{
    flexDirection: "row",
    justifyContent: 'space-between',
    alignContent: "center",
    margin: 5,
  },
  quantity:{
    padding: 0,
    textAlign : 'center',
    lineHeight: 10,
    maxWidth : '50%'
  },
  listeItemIcons:{
    height:20,
    width: 20
  },
  emptyMessage:{
    textAlign: "center",
    marginTop: '50%',
  },
})