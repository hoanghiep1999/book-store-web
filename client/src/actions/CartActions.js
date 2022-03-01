export const addCart = (payload) => {
  return {
    type: "ADD_CART",
    payload: payload
  }
}

export const removeCart = (payload) => {
  return {
    type: "REMOVE_CART",
    payload: payload
  }
}

export const increaseCart = (payload) => {
  return {
    type: "INCREASE_COUNT",
    payload: payload
  }
}

export const decreaseCart = (payload) => {
  return {
    type: "DECREASE_COUNT",
    payload: payload
  }
}

export const removeCartAll = () => {
  return {
    type: "REMOVE_CART_ALL"
  }
}