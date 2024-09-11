import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: []
    },
    reducers: {
        addItem: (state,action) => {
            //mutating the state over here
            state.items.push(action.payload);            
        },
        removeItem: (state,action) => {
            //Remove kisi bhi index se
            const index = action.payload; // The index of the item to remove
            if (index >= 0 && index < state.items.length) {
                state.items.splice(index, 1); // Remove the item at the given index
            }
        },
        clearCart: (state) => {
            state.items.length = 0; // [] empty array
        },
    },
});
 
// export { addItem, removeItem, clearCart } 
export const { addItem,removeItem,clearCart } = cartSlice.actions;
export default cartSlice.reducer;
