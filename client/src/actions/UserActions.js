export const setUser = (payload) => {
  return {
    type: "SET_USER",
    payload: payload
  }
}

export const removeUser = () => {
  return {
    type: "REMOVE_USER"
  }
}