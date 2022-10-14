import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

import { Pizza, FetchPizzasArgs } from "./types"


export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>(
    'pizza/fetchPizzasStatus', async (params) => {
        const { search, category, sortBy, order, currentPage } = params
        const res = await axios.get<Pizza[]>(`https://62d9c99f9eedb69963629389.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        return res.data
    }
)

