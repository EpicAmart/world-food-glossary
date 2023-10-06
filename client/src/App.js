import './App.css';
import React, { Fragment } from "react"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Tabular from './components/Tabular';

function App() {
  return (
   <Fragment>
    <Tabular api = {"diet"}/>
    {/* <Router>
      <Routes>
        <Route />
        <Route />
        <Route />
      </Routes>
    </Router> */}
   </Fragment>
  );
}

export default App;
