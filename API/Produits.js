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
