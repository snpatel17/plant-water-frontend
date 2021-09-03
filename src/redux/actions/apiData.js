import axios from 'axios'

const REACT_APP_MY_URL = 'https://localhost:44359/api/plant/'
const apiData = {
  plants(url = REACT_APP_MY_URL) {
    return {
      GetAllPlants: () => axios.get(url),
      GetPlantById: (id) => axios.get(url + id),
      UpdatePlantPatch: (id, updatedPlant) => axios.put(url + id, updatedPlant),
    }
  },
}

export default apiData
