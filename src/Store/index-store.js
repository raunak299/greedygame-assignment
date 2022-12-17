import { configureStore } from "@reduxjs/toolkit";
import dataSliceReducer from "./Data-Slice";

const store = configureStore({
  reducer: { dataSlice: dataSliceReducer },
});
export default store;
