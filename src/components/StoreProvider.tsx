"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import {
  hydrateFavorites,
  FavoritesState,
} from "@/store/favoritesSlice";
import {
  hydrateCart,
  CartState,
} from "@/store/cartSlice";

const FAVORITES_STORAGE_KEY = "favorites";
const CART_STORAGE_KEY = "cart";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as FavoritesState;
        if (parsed?.ids && parsed?.entities) {
          store.dispatch(hydrateFavorites(parsed));
        }
      }
      const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart) as CartState;
        if (parsedCart?.items) {
          store.dispatch(hydrateCart(parsedCart));
        }
      }
    } catch (error) {
      console.warn("Failed to load persisted state", error);
    }

    const unsubscribe = store.subscribe(() => {
      const favorites = store.getState().favorites;
      window.localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(favorites)
      );
      const cart = store.getState().cart;
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    });

    return () => unsubscribe();
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
