import { useDispatch } from 'react-redux'
import { GiPlantRoots } from 'react-icons/gi'
import * as plantActions from '../redux/actions/plantActions'
import { Button } from './Stylesheet/Button'
import './Stylesheet/PlantListing.css'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

function PlantListing({
  plant,
  waterStatus,
  isWatering,
  toggleWaterPlant,
  currentlyWatering,
  addCooldown,
}) {
  const dispatch = useDispatch()

  const stopWatering = () => {
    dispatch(
      plantActions.UpdatePlantPatch(
        { [plant.id]: plant.id },
        () => {
          window.alert('success')
          addCooldown(plant.id, 30)
        },
        () => {
          window.alert('failed')
        }
      )
    )
    toggleWaterPlant(plant.id, plant.waterStatus)
  }

  return (
    <div className="plants__container-card">
      <div className="plants__container-cardInfo">
        <div className="icon">
          <GiPlantRoots />
        </div>
        <h3>
          {dayjs(dayjs()).diff(plant.startTime, 'hours', true) >= 6
            ? 'Plant has not been watered for 6 hours'
            : ''}
        </h3>
        <h4> Name: {plant.plantName}</h4>
        <ul className="plants__container-features">
          <li>Last watering time:</li>
          <li> {dayjs(plant.startTime).format('DD MMM YYYY HH:mm ')}</li>
          <li>Watering status: </li>

          <li> {dayjs(plant.startTime).fromNow()} </li>
        </ul>

        <input
          className="water-checkbox"
          type="checkbox"
          checked={isWatering}
          onChange={() => toggleWaterPlant(plant.id, plant.waterStatus)}
        />
        <Button
          buttonSize="btn--wide"
          buttonColor="primary"
          onClick={stopWatering}
          disabled={!currentlyWatering || !isWatering}
        >
          Stop Watering
        </Button>
      </div>
    </div>
  )
}

export default PlantListing
