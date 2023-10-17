import './App.css';
import React, { Fragment } from "react"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from './components/Home'
import Form from './components/Form'

function App() {
  return (
   <Fragment>
    <Router>
      <Routes>
        <Route path="home" element={<Home />}/>
        <Route path="add" element={<Form />}/>
        <Route />
      </Routes>
    </Router>
   </Fragment>
  );
}

export default App;
