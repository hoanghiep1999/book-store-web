import { combineReducers } from 'redux';
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
import { userReducer } from '../reducers/UserReducer';
import { cartReducer } from '../reducers/CartReducer';

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer
})

const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}
 
export default configureStore;