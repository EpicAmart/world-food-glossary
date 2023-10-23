import React, { Fragment } from 'react'
import Tabular from './Tabular'

const Home = () => {
  return (
    <Fragment>
        <main className="HealthApp-main">
            <h1>Amartya's Health Hub</h1>
            <Tabular api = {"diet"} headers = {["date", "calories", "carbs", "protein", "fat"]} keyHeader={"food_id"}/>
            <Tabular api = {"exercise"} headers = {["date", "calories", "muscle"]} keyHeader={"exercise_id"}/>
        </main>
        
    </Fragment>
  )
}

export default Home