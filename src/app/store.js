import { configureStore } from '@reduxjs/toolkit'
import configure from '../components/configure'

export const store = configureStore({
    reducer: {
        recipeBooleanControl: configure,
    },
})