import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import Thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';
import auth from "../src/reducers/index";
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['auth'] // which reducer want to store
};
const pReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(pReducer, applyMiddleware(Thunk));
const persistor = persistStore(store);
export { persistor, store };
// export default store;

