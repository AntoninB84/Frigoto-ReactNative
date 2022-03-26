//const url = 'http://192.168.1.97:8080/api/'
const url = 'https://frigoto.herokuapp.com/api/'

export function getProduits(inventaireId, token) {
  return fetch(url+"inventaire/"+inventaireId+"/produits", {
    method : 'GET',
    headers: {
      'x-access-token': token,
      'Content-Type': 'application/json'
    }
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getProduitsLike(query, token) {
  return fetch(url+"produits/like/"+query, {
    method : 'GET',
    headers: {
      'x-access-token': token,
      'Content-Type': 'application/json'
    }
  })
  .then((response) => response.json())
  .catch((error) => console.log(error))
}

export function incrementerProduit(inventaireId, produitId, token){
  return fetch(url+"inventaire/"+inventaireId+"/incrementerProduit", {
    method : 'POST',
    headers: {
      'x-access-token': token,
      'Content-Type': 'application/json'
    },
    body : JSON.stringify({
      produitId : produitId
    })
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function decrementerProduit(inventaireId, produitId, token){
  return fetch(url+"inventaire/"+inventaireId+"/decrementerProduit", {
    method : 'POST',
    headers: {
      'x-access-token': token,
      'Content-Type': 'application/json'
    },
    body : JSON.stringify({
      produitId : produitId
    })
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function postProduits(inventaireId, produits, token){
  return fetch(url+"inventaire/"+inventaireId+"/produits", {
    method : 'POST',
    headers: {
      'x-access-token': token,
      'Content-Type': 'application/json'
    },
    body : JSON.stringify({
      produits : produits
    })
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}