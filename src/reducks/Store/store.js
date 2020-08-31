import { createStore as reduxCreateStore, combineReducers } from "redux";

//import reducers
import { UsersReducer } from "../Users/reducers";
// import {ProductsReducer} from "../Users/reducers";

export default function createStore() {
  return reduxCreateStore(
    combineReducers({
      // products: ProductsReducer,
      users: UsersReducer,
    })
  );
}
