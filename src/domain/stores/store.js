import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "../slices/loginSlice";
import { userSlice } from "../slices/userSlice";


const store=configureStore({
    reducer:{loginReducer:loginSlice.reducer,userReducer:userSlice.reducer}
});

export default store;
export const loginActions=loginSlice.actions;
export const userActions=userSlice.actions;