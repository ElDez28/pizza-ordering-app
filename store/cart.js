import { configureStore, createSlice } from "@reduxjs/toolkit";
const initialState = [];
const sizeSlice = createSlice({
  name: "size",
  initialState: 0,
  reducers: {
    changeSize(state, action) {
      return action.payload;
    },
  },
});

const adminSlice = createSlice({
  name: "admin",
  initialState: false,
  reducers: {
    setAdmin(state, action) {
      return action.payload;
    },
  },
});
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    createOrder(state, action) {
      const existingOrder = state.find((order) => {
        return (
          order.id === action.payload.id && order.size === action.payload.size
        );
      });

      if (existingOrder) {
        const filteredState = state.filter((item) => {
          return (
            item.id !== existingOrder.id ||
            (item.id === existingOrder.id && item.size !== existingOrder.size)
          );
        });
        return [
          ...filteredState,
          {
            ...existingOrder,
            quantity: Number(existingOrder.quantity) + action.payload.quantity,
            total: Number(existingOrder.total) + action.payload.total,
          },
        ];
      } else {
        return [...state, action.payload];
      }
    },
    reset() {
      return initialState;
    },
    decreaseQuantity(state, action) {
      const targetedItem = state.find((item) => {
        return (
          item.id === action.payload.id && item.size === action.payload.size
        );
      });
      const extras = targetedItem.extras.reduce(
        (agg, cur) => agg + cur.price,
        0
      );

      if (targetedItem.quantity > 1) {
        targetedItem.quantity--;
        targetedItem.total = targetedItem.total - targetedItem.price - extras;
        return state;
      }
      if (targetedItem.quantity === 1) {
        const newState = state.filter(
          (item) =>
            item.id !== targetedItem.id ||
            (item.id === targetedItem.id && item.size !== targetedItem.size)
        );
        return newState;
      }
    },
    increaseQuantity(state, action) {
      const targetedItem = state.find((item) => {
        return (
          item.id === action.payload.id && item.size === action.payload.size
        );
      });
      const extras = targetedItem.extras.reduce(
        (agg, cur) => agg + cur.price,
        0
      );
      const newQuantity = targetedItem.quantity + 1;
      const newTotal = targetedItem.price * newQuantity + extras * newQuantity;
      targetedItem.quantity = newQuantity;
      targetedItem.total = newTotal;

      return state;
    },
  },
});

export const orderActions = orderSlice.actions;
export const sizeActions = sizeSlice.actions;
export const adminActions = adminSlice.actions;
const store = configureStore({
  reducer: {
    order: orderSlice.reducer,
    size: sizeSlice.reducer,
    admin: adminSlice.reducer,
  },
});
export default store;
