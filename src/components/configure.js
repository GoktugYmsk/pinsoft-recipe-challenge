import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    input: '',
}

export const configure = createSlice({
    name: 'control',
    initialState,
    reducers: {
        setInput: (state, action) => {
            state.input = action.payload;
        },
    }
})

export const { setInput } = configure.actions

export default configure.reducer