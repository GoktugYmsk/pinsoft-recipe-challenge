import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isHamburger: false,
}

export const configure = createSlice({
    name: 'control',
    initialState,
    reducers: {
        setIsHamburger: (state, action) => {
            state.isHamburger = action.payload;
        },
    }
})

export const { setIsHamburger } = configure.actions

export default configure.reducer