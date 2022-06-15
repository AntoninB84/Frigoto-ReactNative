import {connect, useSelector, useDispatch} from 'react-redux'
import React, {useContext, useState} from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Image} from 'react-native';
import ProductList from './productList.js';
import {getProduits, incrementerProduit, decrementerProduit} from '../../API/Produits.js'
import Header from '../resources/header';

function Inventaire(props){

  const {navigation} = props
  const dispatch = useDispatch()
  const [listeProduits, setListeProduits] = useState([])
  const inventaireId = navigation.getParam('inventaireId', 'NO-ID')
  const nomInventaire = navigation.getParam('nomInventaire', 'NO-ID')

  React.useEffect(() => {
    _loadProduits()
  }, [])

  const _loadProduits = () => {
    getProduits(inventaireId, props.api_token).then(data => {
      //console.log(data)
      setListeProduits(data.produits)
    })
  }

  const _navigateToAddProduct = () => {
    props.navigation.navigate('AddProduct', {
      inventaireId: inventaireId,
      onGoBack: () => _loadProduits()
    })
  }

  const _incrementerProduit = (produitId, index) => {
    incrementerProduit(inventaireId, produitId, props.api_token)
    .then(data => {
      console.log(data)
      _loadProduits()
    })
  }

  const _decrementerProduit = (produitId, index) => {
    decrementerProduit(inventaireId, produitId, props.api_token)
    .then(data => {
      console.log(data)
      _loadProduits()
    })
  }

    return(
      <>
        <Header navigation={props.navigation}/>
        <View style={styles.container}>
          <Text style={styles.titre}>{nomInventaire}</Text>
          <ProductList 
            listeProduits={listeProduits}
            boutonPlus={_incrementerProduit}
            boutonMoins={_decrementerProduit}
            emptyMessage={"Il n'y a rien dans votre inventaire."}
            editable={false}
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
  titre:{
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'Maiandra GD',
    padding: 15,
    color: "#393738"
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
