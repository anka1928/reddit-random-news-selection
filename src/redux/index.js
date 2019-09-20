import createReducer from './createReducer'
import initialState from './initialState'
import {
    GET_NEWS,
    NEWS_RECEIVED,
    FETCH_ALL_FAIL
  } from './actionTypes'

  export default createReducer(initialState, {
    [GET_NEWS]: (state, action) => {
      return {
        ...initialState,
        isFetching: true
      }
    },
  
    [NEWS_RECEIVED]: (state, action) => {
      return {
        ...state,
        all: action.news,
        currentOption: action.currentOption,
        randomNews: action.randomNews,
        isFetching: false
      }
    },
  
    [FETCH_ALL_FAIL]: (state, action) => {
      
      return {
        ...state,
        isFetching: false
      }
    },
  })
  