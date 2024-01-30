import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isHamburger: false,
    toastMessage: '',
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
    }
})

export const { setIsHamburger, setToastMessage } = configure.actions

export default configure.reducer