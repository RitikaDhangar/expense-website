import { createSlice } from "@reduxjs/toolkit";
const productSlice = createSlice({
    name: 'products',
    initialState: { count: 2 },
    reducers: {
        addQuantity_Product: (state, action) => {
            state.count += action.payload;
        },
        substractQuantity_Product: (state, action) => {
            state.count -= action.payload;
        },
    }
})

export const { addQuantity_Product, substractQuantity_Product } = productSlice.actions;
export default productSlice.reducer