import { PayloadAction, createSlice, createAction } from '@reduxjs/toolkit'
import {HYDRATE} from 'next-redux-wrapper'
import {RootState} from '../store'

const initialState = {}
const name = 'home'

const hydrateAction = createAction<RootState>(HYDRATE)

const slice = createSlice({
  name,
  initialState,
  reducers: {
    fetchHomePageData: (state, _: PayloadAction) => state,
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
