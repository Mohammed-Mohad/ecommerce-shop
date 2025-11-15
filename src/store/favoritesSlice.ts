import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types";

export interface FavoritesState {
  ids: number[];
  entities: Record<number, Product>;
}

export const initialFavoritesState: FavoritesState = {
  ids: [],
  entities: {},
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: initialFavoritesState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existing = state.entities[product.id];

      if (existing) {
        delete state.entities[product.id];
        state.ids = state.ids.filter((id) => id !== product.id);
      } else {
        state.entities[product.id] = product;
        state.ids.unshift(product.id);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (state.entities[id]) {
        delete state.entities[id];
        state.ids = state.ids.filter((favoriteId) => favoriteId !== id);
      }
    },
    clearFavorites: (state) => {
      state.ids = [];
      state.entities = {};
    },
    hydrateFavorites: (_state, action: PayloadAction<FavoritesState>) => {
      return action.payload ?? initialFavoritesState;
    },
  },
});

export const {
  toggleFavorite,
  removeFavorite,
  clearFavorites,
  hydrateFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
