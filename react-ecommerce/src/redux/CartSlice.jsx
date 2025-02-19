import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        addedProducts:[]
    },
    reducers:{
        addToCart:(state,action)=>{
            const product = action.payload

            state.addedProducts.push({
                ...product
            })
             
        },
        removeFromCart: (state, action) => {
            state.addedProducts = state.addedProducts.filter(item => item._id !== action.payload);
          }

    }
})

export const{addToCart,removeFromCart}=cartSlice.actions
export default cartSlice.reducer