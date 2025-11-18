import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ThemeMode = "light" | "dark";

export interface ThemeState {
  mode: ThemeMode;
}

export const initialThemeState: ThemeState = {
  mode: "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
    },
    hydrateTheme: (_state, action: PayloadAction<ThemeState | undefined>) =>
      action.payload ?? initialThemeState,
  },
});

export const { toggleTheme, setTheme, hydrateTheme } = themeSlice.actions;

export default themeSlice.reducer;
