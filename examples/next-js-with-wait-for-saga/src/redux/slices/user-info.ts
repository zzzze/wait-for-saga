import { PayloadAction, createSlice, createAction } from '@reduxjs/toolkit'
import {HYDRATE} from 'next-redux-wrapper'
import {RootState} from '../store'

const initialState = {
  name: '',
  age: 0,
}
const name = 'userInfo'

const hydrateAction = createAction<RootState>(HYDRATE)

const slice = createSlice({
  name,
  initialState,
  reducers: {
    fetchName: (state, _: PayloadAction) => state,
    fetchNameSuccess: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    fetchAge: (state, _: PayloadAction) => state,
    fetchAgeSuccess: (state, action: PayloadAction<number>) => {
      state.age = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrateAction, (state, action) => {
      return {
        ...state,
        ...action.payload[name],
      }
    })
  },
})

export default slice
export const { actions, reducer } = slice
