import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { ICatalogue } from '../../utilities/interfaces/catalogue.interface'

export interface CartState {
    item: ICatalogue | null
}

const initialState: CartState = {
    item: null
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemAction(_, action: PayloadAction<ICatalogue>) {
            return {
                item: action.payload
            }
        }
    },
})

export const { addItemAction } = cartSlice.actions

export default cartSlice.reducer