import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getCartFromLS } from "../../utils/getCartFromLS"
import { calcTotalPrice } from "../../utils/calcTotalPrice"
import { CartItem, CartSliceState } from "./types"

const { items, totalPrice } = getCartFromLS()

const initialState: CartSliceState = {
    totalPrice,
    items
}

const cartSlice = createSlice({
    name: 'cart', // Название слайса
    initialState, // Состояние(стейт)
    // actions
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) { // при вызове dispatch получит свое состояние(state) и действие(action)
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                })
            }
            state.totalPrice = calcTotalPrice(state.items)
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(obj => obj.id === action.payload)
            if (findItem) {
                findItem.count--
                state.totalPrice = state.totalPrice - findItem.price
            }
        },
        removeItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(obj => obj.id === action.payload)
            if (findItem) {
                state.totalPrice = state.totalPrice - findItem.price
                state.items = state.items.filter(obj => obj.id !== action.payload)
            }

        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0
        }
    }
})




export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions

export default cartSlice.reducer