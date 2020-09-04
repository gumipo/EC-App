import * as Actions from "./actions";
import initialState from "../Store/initialState";

export const ProductsReducer = (state = initialState.products, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
