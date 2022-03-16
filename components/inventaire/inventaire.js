import {connect, useSelector, useDispatch} from 'react-redux'
import React, {useContext, useState} from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableWithoutFeedback, 
  TouchableOpacity, 
  Image} from 'react-native';
import {getProduits} from '../../API/Produits.js'
import Header from '../resources/header';

function Inventaire(props){

  const {navigation} = props
  const dispatch = useDispatch()
  const [listeProduits, setListeProduits] = useState([
    {"id":0, "nom":"", "quantity":2 },
    {"id":1, "nom":"Carotte", "quantity":2 },
    {"id":2, "nom":"kmlkjqsdf", "quantity":2 },
    {"id":3, "nom":"dflkjdmlgjsdf", "quantity":2 },
    {"id":4, "nom":"dsfgsdfgsdfg", "quantity":2 },
    {"id":5, "nom":"dsfgsdfgsdfg", "quantity":2 },
    {"id":6, "nom":"dsfgdsfgsdfg", "quantity":2 },
    {"id":7, "nom":"gfdgdgdgdg", "quantity":2 },
    {"id":8, "nom":"", "quantity":2 },
    {"id":9, "nom":"Carotte", "quantity":2 },
    {"id":10, "nom":"kmlkjqsdf", "quantity":2 },
    {"id":11, "nom":"dflkjdmlgjsdf", "quantity":2 },
    {"id":12, "nom":"dsfgsdfgsdfg", "quantity":2 },
    {"id":13, "nom":"dsfgsdfgsdfg", "quantity":2 },
    {"id":14, "nom":"dsfgdsfgsdfg", "quantity":2 },
    {"id":15, "nom":"gfdgdgdgdg", "quantity":2 },
    {"id":16, "nom":"", "quantity":2 },
    {"id":17, "nom":"Carotte", "quantity":2 },
    {"id":18, "nom":"kmlkjqsdf", "quantity":2 },
    {"id":19, "nom":"dflkjdmlgjsdf", "quantity":2 },
    {"id":20, "nom":"dsfgsdfgsdfg", "quantity":2 },
    {"id":21, "nom":"dsfgsdfgsdfg", "quantity":2 },
    {"id":22, "nom":"dsfgdsfgsdfg", "quantity":2 },
    {"id":23, "nom":"gfdgdgdgdg", "quantity":2 },
    {"id":24, "nom":"", "quantity":2 },
    {"id":25, "nom":"Carotte", "quantity":2 },
    {"id":26, "nom":"kmlkjqsdf", "quantity":2 },
    {"id":27, "nom":"dflkjdmlgjsdf", "quantity":2 },
    {"id":28, "nom":"dsfgsdfgsdfg", "quantity":2 },
    {"id":29, "nom":"dsfgsdfgsdfg", "quantity":2 },
    {"id":30, "nom":"dsfgdsfgsdfg", "quantity":2 },
    {"id":31, "nom":"gfdgdgdgdg", "quantity":2 },
    {"id":32, "nom":"", "quantity":2 },
    {"id":33, "nom":"Carotte", "quantity":2 },
    {"id":34, "nom":"kmlkjqsdf", "quantity":2 },
    {"id":35, "nom":"dflkjdmlgjsdf", "quantity":2 },
    {"id":36, "nom":"dsfgsdfgsdfg", "quantity":2 },
    {"id":37, "nom":"dsfgsdfgsdfg", "quantity":2 },
    {"id":38, "nom":"dsfgdsfgsdfg", "quantity":2 },
    {"id":39, "nom":"gfdgdgdgdg", "quantity":2 },
    {"id":40, "nom":"", "quantity":2 },
    {"id":41, "nom":"Carotte", "quantity":2 },
    {"id":42, "nom":"kmlkjqsdf", "quantity":2 },
    {"id":43, "nom":"dflkjdmlgjsdf", "quantity":2 },
    {"id":44, "nom":"dsfgsdfgsdfg", "quantity":2 },
    {"id":45, "nom":"dsfgsdfgsdfg", "quantity":2 },
    {"id":46, "nom":"dsfgdsfgsdfg", "quantity":2 },
    {"id":47, "nom":"gfdgdgdgdg", "quantity":2 },
  ])
  const inventaireId = navigation.getParam('inventaireId', 'NO-ID')
  const nomInventaire = navigation.getParam('nomInventaire', 'NO-ID')

  React.useEffect(() => {
    //_loadProduits()
  }, [])


  const _loadProduits = () => {
    getProduits(inventaireId, props.api_token).then(data => {
      setListeProduits(data.produits)
    })
  }

  const _navigateToAddProduct = () => {

  }



    return(
      <>
        <Header navigation={props.navigation}/>
        <View style={styles.container}>
          <FlatList
            data={listeProduits}
            numColumns={3}
            style={styles.liste}
            contentContainerStyle={{ paddingBottom: 80 }} 
            keyExtractor={(item, index) => item.id}
            ListEmptyComponent={() => {
              return (
              <Text style={styles.emptyMessage}>
                Il n'y a rien dans votre inventaire.
              </Text>
              )
            }}
            renderItem={({item}) =>
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
                      onPress={() => {}}
                    >
                      <Image
                        style={styles.listeItemIcons}
                        source={require('../../assets/moins.png')}
                      />
                    </TouchableOpacity>
                    <Text>{item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() => {}}
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


          <TouchableOpacity
            style={styles.floatingactionbutton}
            onPress={() => _navigateToAddProduct()}>
            <Image
              style={styles.floatingactionbutton_image}
              source={require('../../assets/floatingRedButton.png')} />
          </TouchableOpacity>
        </View>
      </>
      
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

export default connect(mapStateToProps)(Inventaire)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
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
  listeItemIcons:{
    height:20,
    width: 20
  },
  emptyMessage:{
    textAlign: "center",
    marginTop: '50%',
  },
  floatingactionbutton: {
    position: 'absolute',
    width: 50,
    height: 50,
    right: 10,
    bottom: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  floatingactionbutton_image: {
    width: 50,
    height: 50
  }
});
