import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: []
    },
    reducers: {

        // OLD REDUX -----> DONT MUTATE STATE
        //   used to create a new state from older one
        //   const newstate = {...state}  (spread operator)

        // uses Immer behind the scenes

        addItem: (state,action) => {
            //mutating the state over here
            state.items.push(action.payload);            
        },

        removeItem: (state,action) => {
            state.items = state.items.filter(
                (item) => item.card.info.id !== action.payload.card.info.id
              );
        },
        clearCart: (state) => {
            state.items.length = 0; // [] empty array
        },
    },
});
 
// export { addItem, removeItem, clearCart } 
export const { addItem , removeItem , clearCart } = cartSlice.actions;
export default cartSlice.reducer;
