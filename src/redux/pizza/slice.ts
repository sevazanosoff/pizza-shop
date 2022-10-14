import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Pizza, PizzaSliceState, Status } from './types'
import { fetchPizzas } from './asyncActions'

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING
}

const pizzaSlice = createSlice({
    name: 'pizza', // Название слайса
    initialState, // Состояние(стейт)
    // actions
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = Status.LOADING
            state.items = []
        })
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload
            state.status = Status.SUCCESS
        })
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = Status.ERROR
        })
        // [fetchPizzas.pending]: (state) => {
        //     state.status = 'loading'
        //     state.items = []
        // },
        // [fetchPizzas.fulfilled]: (state, action) => {
        //     state.items = action.payload
        //     state.status = 'success'
        // },
        // [fetchPizzas.rejected]: (state) => {
        //     state.status = 'error'
        //     state.items = []
        // }
    }
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer







