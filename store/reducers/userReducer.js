const initialTokenState = { 
  api_token: "", 
  user_id:"", 
  user_name:"", 
  user_surname:"", 
  user_email:"",
}

export default function setApiToken(state = initialTokenState, action) {
  let nextState
  switch (action.type) {
    case 'SET_API_TOKEN':
      nextState = {
        ...state,
        api_token: action.value
      }
      return nextState || state
    case 'SET_USER_ID':
      nextState = {
        ...state,
        user_id: action.value
      }
      return nextState || state
    case 'SET_USER_NAME':
      nextState = {
        ...state,
        user_name: action.value
      }
      return nextState || state
    case 'SET_USER_SURNAME':
      nextState = {
        ...state,
        user_surname: action.value
      }
      return nextState || state
    case 'SET_USER_EMAIL':
      nextState = {
        ...state,
        user_email: action.value
      }
      return nextState || state
    case 'RESET':
      nextState = {
        ...state,
        api_token: "", 
        user_id:"", 
        user_name:"", 
        user_surname:"", 
        user_email:"",
      }
      return nextState || state

  default:
    return state
  }
}
