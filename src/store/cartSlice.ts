import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Product } from '@/types';

export interface CartState {
  items: CartItem[];
  updatedAt?: number;
}

export const initialCartState: CartState = {
  items: [],
  updatedAt: undefined,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.updatedAt = Date.now();
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.updatedAt = Date.now();
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.id === id);
      if (itemToUpdate) {
        if (quantity > 0) {
          itemToUpdate.quantity = quantity;
        } else {
          // If quantity is 0 or less, remove the item
          state.items = state.items.filter(item => item.id !== id);
        }
        state.updatedAt = Date.now();
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.updatedAt = Date.now();
    },
    hydrateCart: (_state, action: PayloadAction<CartState>) => action.payload,
  },
});

export const { addItem, removeItem, updateQuantity, clearCart, hydrateCart } = cartSlice.actions;
export default cartSlice.reducer;
