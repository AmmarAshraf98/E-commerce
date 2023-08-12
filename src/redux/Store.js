import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/CartSlice";
export const Store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

export default Store;
