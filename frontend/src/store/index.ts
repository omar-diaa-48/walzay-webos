import { combineReducers, configureStore } from '@reduxjs/toolkit'
import cart from './slices/cart'
import user from './slices/user'

export const store = configureStore({
    reducer: combineReducers({
        cart,
        user
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch