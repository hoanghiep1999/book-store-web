import { toast } from "react-toastify";

const initState = {
  cartList: []
}

export const cartReducer = (state = initState, action) => {
  switch(action.type) {
    case "ADD_CART": {
      toast.success(`"${action.payload.title}" has been added to your cart!`);
      return {...state, cartList: [{...action.payload, quantity: 1}, ...state.cartList]};
    }
    case "REMOVE_CART": {
      toast.success(`"${action.payload.title}" has been removed!`);
      const newCart = state.cartList.filter(product => product.title !== action.payload.title);
      return {...state, cartList: [...newCart]};
    }
    case "INCREASE_COUNT": {
      const checkProduct = state.cartList.find(product => product._id === action.payload._id);
      if(checkProduct) {
        state.cartList.forEach(product => {
          if(product._id === action.payload._id) {
            product.quantity += 1;
          }
        })
      }
      return {...state, cartList: [...state.cartList]};
    }
    case "DECREASE_COUNT": {
      const checkProduct = state.cartList.find(product => product._id === action.payload._id);
      if(checkProduct) {
        state.cartList.forEach(product => {
          if(product._id === action.payload._id) {
            if(product.quantity > 0)
              product.quantity -= 1;
            else 
              product.quantity = 0;
          }
        })
      }
      return {...state, cartList: [...state.cartList]};
    }
    case "REMOVE_CART_ALL": {
      return {...state, cartList: []};
    }
    default:
      return state;
  }
}