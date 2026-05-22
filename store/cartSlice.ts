import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface CartItem {
  id: number | string;
  price: number;
  quantity?: number;
  [key: string]: any;
}

interface ItemState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}
const loadCart = (): ItemState => {
  try {
    const data = localStorage.getItem('cart');
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.log(error);}
  return {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  };
};
const saveCart = (state: ItemState) => {
  localStorage.setItem('cart', JSON.stringify(state));
};
const initialState: ItemState = loadCart();
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const product = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity! += 1;
      } else {
        state.items.push({ ...product,quantity: 1});
      }
      state.totalQuantity += 1;
      state.totalPrice += product.price;
      saveCart(state);
    },

    removeFromCart: (
      state,
      action: PayloadAction<number | string>
    ) => {
      const id = action.payload;

      const existingItem = state.items.find(
        (item) => item.id === id
      );

      if (!existingItem) return;
      state.totalQuantity -= 1;
      state.totalPrice -= existingItem.price;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter( (item) => item.id !== id)
      } else {
        existingItem.quantity! -= 1;
      }
      saveCart(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      saveCart(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;