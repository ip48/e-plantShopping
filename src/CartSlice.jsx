import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalQuantity : 0,
  },
  reducers: {
    addItem: (state, action) => {
        const { name, image, cost } = action.payload;
        const existingItem = state.items.find(item => item.name === name);
        if (existingItem) {
          existingItem.quantity++;
        } else {
          state.items.push({ name, image, cost, quantity: 1 });
        }
        state.totalQuantity++;
    
    },
    removeItem: (state, action) => {
        state.items = state.items.filter(item => item.name !== action.payload.name);
        state.totalQuantity-= action.payload.quantity;
    },
    updateQuantity: (state, action) => {
        const {name, quantity} = action.payload;
        //console.log(`updateQuantity reducer: ${name} - ${quantity}`);
        const product = state.items.find(item => item.name === name);
        if(product){
            state.totalQuantity += quantity - product.quantity;
            product.quantity = quantity;
        }
  
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
