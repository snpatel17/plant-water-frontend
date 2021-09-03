import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectPlantState } from '../redux/reducers/plantReducer'
import * as plantActions from '../redux/actions/plantActions'
import PlantListing from './PlantLisiting'
import { Button } from './Stylesheet/Button'
import './Stylesheet/PlantListing.css'

function PlantComponent() {
  const { plants } = useSelector(selectPlantState)

  const dispatch = useDispatch()
  const [plantsToWater, setPlantsToWater] = useState({})
  const [cooldowns, setCooldowns] = useState({})
  const [currentlyWatering, setCurrentlyWatering] = useState(false)
  const [time, setTime] = useState(new Date())
  const waterInterval = useRef(null)

  useEffect(() => {
    dispatch(plantActions.setPlant())
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
      setCooldowns((current) => {
        const newCooldowns = {}
        Object.keys(current).forEach((key) => {
          if (current[key] - 1 > 0) {
            newCooldowns[key] = current[key] - 1
          }
        })
        return newCooldowns
      })
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const toggleWaterPlant = (id, initwaterStatus) => {
    if (plantsToWater.hasOwnProperty(id)) {
      const plantsCopy = Object.assign({}, plantsToWater)
      delete plantsCopy[id]
      setPlantsToWater({
        ...plantsCopy,
      })
    } else {
      if (cooldowns[id]) window.alert('please wait 30s before watering again')
      else
        setPlantsToWater({
          ...plantsToWater,
          [id]: initwaterStatus,
        })
    }
  }

  const addCooldown = (id, cooldownAmountInSeconds) => {
    setCooldowns({
      ...cooldowns,
      [id]: cooldownAmountInSeconds,
    })
  }

  const toggleWatering = () => {
    if (currentlyWatering) {
      // the user wants to stop watering the plant
      // send a request to server to update plant status

      if (Object.keys(plantsToWater).length !== 0) {
        dispatch(
          plantActions.UpdatePlantPatch(
            plantsToWater,
            () => {
              window.alert('success')
              setCooldowns((current) => {
                const newCooldowns = {}
                Object.keys(plantsToWater).forEach((key) => {
                  newCooldowns[key] = 30
                })
                return newCooldowns
              })
              setPlantsToWater({})
            },
            () => {
              setPlantsToWater({})
            }
          )
        )
      }

      setCurrentlyWatering(false)
    } else {
      setCurrentlyWatering(true)
    }
  }

  useEffect(() => {
    console.log(plantsToWater)
  }, [plantsToWater])

  useEffect(() => {
    if (currentlyWatering) {
      waterInterval.current = setInterval(() => {
        setPlantsToWater((current) => {
          const newPlantsToWater = {}
          Object.keys(current).forEach(
            (key) => (newPlantsToWater[key] = Math.min(current[key] + 10, 100))
          )
          return newPlantsToWater
        })
        console.log('watered')
      }, 1000)
    } else {
      clearInterval(waterInterval.current)
    }
  }, [currentlyWatering])

  return (
    <div className="plants__section">
      <div className="plants__wrapper">
        <div className='className="plants__container-cardInfo"'>
          <p>Select checkbox and Click Start Button for Watering</p>
          <Button
            buttonSize="btn--wide"
            buttonColor="primary"
            className={`watering-button ${
              currentlyWatering ? 'stop-button' : 'start-button'
            }`}
            onClick={toggleWatering}
          >
            {currentlyWatering ? 'Batch Stop Watering' : 'Start Watering'}
          </Button>
        </div>
      </div>
      <div className="all_plants">
        {plants.map((plant) => {
          const isWatering = plantsToWater.hasOwnProperty(plant.id)
          return (
            <PlantListing
              key={plant.id}
              plant={plant}
              waterStatus={
                isWatering ? plantsToWater[plant.id] : plant.waterStatus
              }
              isWatering={isWatering}
              toggleWaterPlant={toggleWaterPlant}
              currentlyWatering={currentlyWatering}
              time={time}
              addCooldown={addCooldown}
            />
          )
        })}
      </div>
    </div>
  )
}

export default PlantComponent
