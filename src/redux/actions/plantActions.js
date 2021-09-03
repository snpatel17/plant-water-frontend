import { ActionTypes } from '../constants/action-types'
import apiData from './apiData'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const setPlant = () => (dispatch) => {
  apiData
    .plants()
    .GetAllPlants()
    .then((response) => {
      dispatch({
        type: ActionTypes.SET_PLANT,
        payload: response.data,
      })
    })
    .catch((err) => console.log(err))
}

export const UpdatePlantPatch = (id, data, onSuccess) => (dispatch) => {
  data.startTime = dayjs()
  apiData
    .plants()
    .UpdatePlantPatch(id, data)
    .then((res) => {
      dispatch({
        type: ActionTypes.UPDATE_PLANT_PATCH,
        payload: { id, ...data },
      })
      onSuccess()
    })
    .catch((err) => console.log(err))
}
