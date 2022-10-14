import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { FilterSliceState, SortPopup, SortPropertyEnum } from "./types"


const initialState: FilterSliceState = {
    inputValue: '',
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности',
        sortProperty: SortPropertyEnum.RATING_DESC
    }
}

const filterSlice = createSlice({
    name: 'filter', // Название слайса
    initialState, // Состояние(стейт)
    // actions
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) { // при вызове dispatch получит свое состояние(state) и действие(action)
            state.categoryId = action.payload
        },
        setInputValue(state, action: PayloadAction<string>) {
            state.inputValue = action.payload
        },
        setSearchValue(state, action: PayloadAction<string>) { // при вызове dispatch получит свое состояние(state) и действие(action)
            state.searchValue = action.payload
        },
        setSort(state, action: PayloadAction<SortPopup>) {
            state.sort = action.payload // Есть спец.метод который меняет Sort на то что прийдет в dispatch(setSort(сюда)) в компоненте Sort.jsx
        },
        setPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
    }
})


export const { setCategoryId, setSort, setPage, setSearchValue, setInputValue } = filterSlice.actions

export default filterSlice.reducer