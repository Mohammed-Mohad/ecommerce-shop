"use client";

import { useEffect, useMemo } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "@/store/store";
import { hydrateFavorites, FavoritesState } from "@/store/favoritesSlice";
import { hydrateCart, CartState } from "@/store/cartSlice";
import { hydrateTheme, ThemeState } from "@/store/themeSlice";
import { hydrateAuth, AuthState } from "@/store/authSlice";

const FAVORITES_STORAGE_KEY = "favorites";
const CART_STORAGE_KEY = "cart";
const THEME_STORAGE_KEY = "theme";
const AUTH_STORAGE_KEY = "auth";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = useMemo<AppStore>(() => makeStore(), []);

  useEffect(() => {
    try {
      const storedFavorites = window.localStorage.getItem(
        FAVORITES_STORAGE_KEY
      );
      if (storedFavorites) {
        const parsed = JSON.parse(storedFavorites) as FavoritesState;
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
      const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (storedTheme) {
        const parsedTheme = JSON.parse(storedTheme) as ThemeState;
        if (parsedTheme?.mode) {
          store.dispatch(hydrateTheme(parsedTheme));
        }
      }
      const storedAuth = window.localStorage.getItem(AUTH_STORAGE_KEY);
      if (storedAuth) {
        const parsedAuth = JSON.parse(storedAuth) as AuthState;
        store.dispatch(hydrateAuth(parsedAuth));
      }
    } catch (error) {
      console.warn("Failed to load persisted state", error);
    }

    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      window.localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(state.favorites)
      );
      window.localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(state.cart)
      );
      window.localStorage.setItem(
        THEME_STORAGE_KEY,
        JSON.stringify(state.theme)
      );
      window.localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify(state.auth)
      );
    });

    return () => unsubscribe();
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
