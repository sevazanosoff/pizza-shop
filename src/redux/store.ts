// Вариант с persist
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import filter from './filter/slice' // Вытаскиваем файл слайса.Название может быть какое угодно
import cart from './cart/slice'
import pizza from './pizza/slice'



const rootReducers = combineReducers({
    filter,
    cart,
    pizza
})

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducers)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
// hooks
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store


// Вариант без persist !!! Для использования раскоментировать в компоненте Header кусок useEffect связанный с localStorage

// import { configureStore } from '@reduxjs/toolkit'
// import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'


// import filter from './filter/slice' // Вытаскиваем файл слайса.Название может быть какое угодно
// import cart from './cart/slice'
// import pizza from './pizza/slice'

// export const store = configureStore({
//     reducer: { filter, cart, pizza }, // filter = filter: filter
// })



// export type RootState = ReturnType<typeof store.getState>
// // hooks
// export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector