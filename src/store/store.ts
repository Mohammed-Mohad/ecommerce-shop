import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import favoritesReducer from "./favoritesSlice";
import themeReducer from "./themeSlice";
import authReducer from "./authSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
      favorites: favoritesReducer,
      theme: themeReducer,
      auth: authReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
