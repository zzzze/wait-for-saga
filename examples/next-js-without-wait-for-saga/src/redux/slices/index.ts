import {combineReducers} from 'redux'
import {actions as homeActions, reducer as homeReducers} from './home'
import {actions as userInfoActions, reducer as userInfoReducers} from './user-info'

export const actions = {
  home: homeActions,
  userInfo: userInfoActions,
}

const reducers = {
  home: homeReducers,
  userInfo: userInfoReducers,
}

export const rootReducer = combineReducers(reducers)
