import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { buildFetchRequest } from '../../utilities/helpers';
import { ISignInForm } from '../../utilities/interfaces/auth.interface';

export interface UserState {
    isAuthenticated: boolean;
    fullName: string;
}

const initialState: UserState = {
    isAuthenticated: false,
    fullName: ''
}

export const signInAsyncAction = createAsyncThunk(
    'user/signIn',
    async (form: ISignInForm) => {
        return buildFetchRequest<IUser>('POST', 'generateToken', form, false)
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signInAsyncAction.fulfilled, (_, action) => {
            return {
                fullName: action.payload.fullName,
                isAuthenticated: true
            }
        })
    },
})

// export const {  } = userSlice.actions

export default userSlice.reducer