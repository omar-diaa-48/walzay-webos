import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_JWT_KEY } from '../../utilities/constants';
import { buildFetchRequest } from '../../utilities/helpers';
import { ISignInForm } from '../../utilities/interfaces/auth.interface';
import { ISliceBaseState } from '../../utilities/interfaces/slice-base-state.interface';

export interface UserState extends ISliceBaseState, Pick<IUser, 'fullName' | 'organization' | 'privileges' | 'configurations'> {
    isAuthenticated: boolean;
}

const initialState: UserState = {
    isAuthenticated: false,
    isLoading: false,
    fullName: '',
    organization: '',
    configurations: {
        placeOrder: {
            referenceNo: ''
        }
    },
    privileges: []
}

export const signInAsyncAction = createAsyncThunk(
    'user/signIn',
    async (form: ISignInForm) => {
        return buildFetchRequest<IUser>('POST', 'generateToken', form, false)
    }
)

export const checkTokenAsyncAction = createAsyncThunk(
    'user/checkToken',
    async () => {
        return buildFetchRequest<IUser>('POST', 'checkToken')
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signOutAction: (state) => {
            localStorage.removeItem(LOCAL_STORAGE_JWT_KEY);

            return {
                ...state,
                isAuthenticated: false
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signInAsyncAction.fulfilled, (_, action) => {
            localStorage.setItem(LOCAL_STORAGE_JWT_KEY, action.payload.token)

            const { fullName, organization, privileges, configurations } = action.payload;

            return {
                isAuthenticated: true,
                isLoading: false,
                fullName,
                organization,
                configurations,
                privileges
            }
        })
        builder.addCase(checkTokenAsyncAction.fulfilled, (_, action) => {
            localStorage.setItem(LOCAL_STORAGE_JWT_KEY, action.payload.token)

            const { fullName, organization, privileges, configurations } = action.payload;

            return {
                isAuthenticated: true,
                isLoading: false,
                fullName,
                organization,
                configurations,
                privileges
            }
        })

        builder.addMatcher(signInAsyncAction.pending.match, (state) => ({ ...state, isLoading: true }))
        builder.addMatcher(checkTokenAsyncAction.pending.match, (state) => ({ ...state, isLoading: true }))

        builder.addMatcher(signInAsyncAction.rejected.match, (state) => ({ ...state, isAuthenticated: false, isLoading: false }))
        builder.addMatcher(checkTokenAsyncAction.rejected.match, (state) => ({ ...state, isAuthenticated: false, isLoading: false }))
    },
})

export const { signOutAction } = userSlice.actions

export default userSlice.reducer