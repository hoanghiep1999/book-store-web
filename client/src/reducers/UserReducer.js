const initState = {
  userEmail: "",
}

export const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_USER": {
      return {...state, userEmail: action.payload};
    }
    case "REMOVE_USER": {
      return {...state, userEmail: ""};
    }
    default: 
      return state;
  }
}