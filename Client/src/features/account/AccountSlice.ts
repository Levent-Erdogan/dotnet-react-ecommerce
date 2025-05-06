import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../model/IUser";
import { FieldValues } from "react-hook-form";
import requests from "../../api/requests";
import { router } from "../../router/Routes";

interface AccountState {
    user: User | null;
}

const initialState: AccountState = {
    user: null
}

export const loginUser = createAsyncThunk<User, FieldValues>(
    "account/login",
    async (data, { rejectWithValue }) => {
        try {
            const user = await requests.Account.login(data);
            localStorage.setItem("user", JSON.stringify(user));
            return user;

        }
        catch (error: any) {
            return rejectWithValue({ error: error.data })

        }
    }
)

export const getUSer = createAsyncThunk<User>(
    "account/getUser",
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)))
        try {
            const user = await requests.Account.getUser();
            localStorage.setItem("user", JSON.stringify(user));
            return user;
        }
        catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    },
    {
        condition:()=>{
            if (!localStorage.getItem("user")) return false;
        }
    }
)

export const AccountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
            router.navigate("/catalog");
        },
        setUser: (state, action) => {
            state.user = action.payload
        }
    },
    extraReducers: (builder => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload
        })

        builder.addCase(getUSer.fulfilled, (state, action) => {
            state.user = action.payload;
        })

        builder.addCase(getUSer.rejected, (state) => {
            state.user = null;
            localStorage.removeItem("user");
            router.navigate("/login");

        })
    }),
})


export const { logout, setUser } = AccountSlice.actions