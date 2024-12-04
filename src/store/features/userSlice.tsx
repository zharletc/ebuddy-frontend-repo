import { Response, User } from '@/interface';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { useTokens } from '@/utils/CustomProvider';
import { get, post } from '@/utils/ClientFetcher';

interface UserState {
    users: User[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed' | 'submitting';
    error: string | null;
}
const initialState: UserState = {
    users: [],
    error: null,
    status: 'idle',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload as any;
            })
            .addCase(fetchUsers.rejected, (state, action: any) => {
                state.status = 'failed';
                state.error = action.payload;
            });

        builder.addCase(updateUser.pending, (state) => {
            state.status = 'submitting';
            state.error = null;
        })
            .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.status = 'succeeded';
                const updatedUser = action.payload;
                const index = state.users.findIndex(user => user.id === updatedUser.id);
                if (index !== -1) {
                    // Update existing user
                    state.users[index] = updatedUser;
                } else {
                    // Add new user
                    state.users.unshift(updatedUser);
                }
            })
            .addCase(updateUser.rejected, (state, action: any) => {
                state.status = 'failed';
                state.error = action.payload;
            });

    },
});

export const fetchUsers = createAsyncThunk(
    'user/fetchUsers',
    async (token: string, thunkAPI) => {
        try {
            const response: Response = await get({ url: '/fetch-user-data', withAuth: true, token: token as any });
            if (!response.success) {
                return thunkAPI.rejectWithValue(response.message);
            }
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message as any);
        }
    }
);

interface UpdateUsersPayload {
    form: any;
    token: string;
}

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (payload: UpdateUsersPayload, thunkAPI) => {
        try {
            const response: Response = await post({ url: '/update-user-data', withAuth: true, form: payload.form as any, token: payload.token as any });
            if (!response.success) {
                return thunkAPI.rejectWithValue(response.message);
            }
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message as any);
        }
    }
);

export default userSlice.reducer;