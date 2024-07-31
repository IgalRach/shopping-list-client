import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  name: string;
  category: Category;
  quantity: number;
}

interface Category {
  id: string;
  name: string;
}

interface ShoppingListState {
  products: Product[];
  totalItems: number;
}

const initialState: ShoppingListState = {
  products: [],
  totalItems: 0,
};

const shoppingList = createSlice({
  name: 'shoppingList',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<{ name: string; category: string }>) => {
      const { name, category } = action.payload;
      const existingProduct = state.products.find((product) => product.name === name);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({ name, {category}, quantity: 1 });
      }
      state.totalItems += 1;
    },
  },
});

export const { addProduct } = shoppingList.actions;
export default shoppingList.reducer;