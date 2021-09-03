import { ActionTypes } from '../constants/action-types'

const initialState = {
  plants: [],
}

export const plantReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_PLANT:
      return {
        ...state,
        plants: [...action.payload],
      }

    case ActionTypes.UPDATE_PLANT_PATCH:
      return {
        ...state,
        plants: [...action.payload],
      }
    default:
      return state
  }
}

export const selectPlantState = (state) => state.plant
