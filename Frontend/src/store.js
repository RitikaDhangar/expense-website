import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./feature/productSlice";
import expenseReducer from "./feature/expenseSlice";
import userReducer from "./feature/userSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["count"],
};
const persistUserConfig = {
  key: "usertoken",
  storage,
  whitelist: ["token"],
};

const persistedProductReducer = persistReducer(persistConfig, productReducer);
const persistedUserReducer = persistReducer(persistUserConfig, userReducer);
const store = configureStore({
  reducer: {
    products: persistedProductReducer,
    expenses: expenseReducer,
    users: persistedUserReducer,
  },
});
const persistor = persistStore(store);
export { store, persistor };
