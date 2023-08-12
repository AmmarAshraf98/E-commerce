import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItem: [],
  totalAmount: 0,
  t_quantity: 0,
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    Add_ToCart: (state, action) => {
      const newItem = action.payload;
      console.log(initialState);
      const existingItem = state.cartItem.find(
        (item) => item.id === newItem.id
      );
      state.t_quantity++;
      if (!existingItem) {
        state.cartItem.push({
          id: newItem.id,
          price: newItem.price,
          title: newItem.title,
          imageUrl: newItem.imageUrl,
          category: newItem.category,
          quantity: 1,
          total_price: newItem.price,
        });
      } else {
        existingItem.quantity += 1;
        existingItem.total_price =
          existingItem.total_price + existingItem.price;
      }
      state.totalAmount = state.cartItem.reduce((total, item) => {
        total += Number(item.price) * Number(item.quantity);
        return total;
      }, 0);
    },

    Delet_Item: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItem.find((item) => item.id === id);
      if (existingItem) {
        state.cartItem = state.cartItem.filter((e) => e.id !== id);
        state.t_quantity -= existingItem.quantity;
      }

      state.totalAmount = state.cartItem.reduce((total, item) => {
        total += Number(item.price) * Number(item.quantity);
        return total;
      }, 0);
      console.log(state.totalAmount);
    },

    Increase: (state, action) => {
      const item_id = action.payload;
      const exist = state.cartItem.find((e) => e.id === item_id);
      if (exist) {
        exist.quantity++;
        state.t_quantity++;
        state.totalAmount = state.cartItem.reduce((total, item) => {
          total += Number(item.price) * Number(item.quantity);
          return total;
        }, 0);
      }
      console.log(state.totalAmount);
    },

    Decrease: (state, action) => {
      const item_id = action.payload;
      const exist = state.cartItem.find((e) => e.id === item_id);
      if (exist.quantity > 1) {
        exist.quantity--;
        state.t_quantity--;
        state.totalAmount -= exist.price;
      } else {
        state.cartItem = state.cartItem.filter((e) => e.id !== item_id);
        state.t_quantity -= exist.quantity;
        state.totalAmount -= exist.price;
      }
      console.log(state.totalAmount);
    },
  },
});

export const Actionss = cartSlice.actions;
export default cartSlice.reducer;
