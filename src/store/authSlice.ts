import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  isAuthenticated: boolean;
  userName: string | null;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  userName: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login: (state, action: PayloadAction<{ name: string }>) => {
      state.isAuthenticated = true;
      state.userName = action.payload.name;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userName = null;
    },
    hydrateAuth: (_state, action: PayloadAction<AuthState | undefined>) =>
      action.payload ?? initialAuthState,
  },
});

export const { login, logout, hydrateAuth } = authSlice.actions;

export default authSlice.reducer;
