import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isHamburger: false,
    toastMessage: '',
    isToastACtive: false,
}

export const configure = createSlice({
    name: 'control',
    initialState,
    reducers: {
        setIsHamburger: (state, action) => {
            state.isHamburger = action.payload;
        },
        setToastMessage: (state, action) => {
            state.toastMessage = action.payload;
        },
        setIsToastActive: (state, action) => {
            state.isToastACtive = action.payload;
        },
    }
})

export const { setIsHamburger, setToastMessage, setIsToastActive } = configure.actions

export default configure.reducer