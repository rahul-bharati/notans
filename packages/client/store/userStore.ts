import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

export interface UserState {
  email: string;
  uid: string;
  username?: string;
}

const initialState: UserState = { email: "", uid: "", username: "" };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState(state, action) {
      state = { ...state, ...action.payload };
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.user,
      };
    },
  },
});

export const { setUserState } = userSlice.actions;

export const selectUserState = (state: AppState) => state.user;

export default userSlice.reducer;
