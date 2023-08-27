import { configureStore } from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import accuntReducer from '../pages/login/loginSlice'
import formReducer from "../pages/Home/formSlice";
import tableReducer from "../pages/Home/tableSlice"
export const store=configureStore(
    {
        reducer:{
            account:accuntReducer,
            form:formReducer,
            table:tableReducer
        }
    }
)
export type RootState=ReturnType<typeof store.getState>
export type AddDispatch=typeof store.dispatch;
export const useAppDispatch=()=>useDispatch<AddDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;