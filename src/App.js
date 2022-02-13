import React, { useRef } from 'react';
import './App.css';
import { People } from './People/People';
import { ImArrowDown } from "react-icons/im";

function App() {

  const detailsRef = useRef(null)

  const scrollToDetails = () => {
    detailsRef.current.scrollIntoView()
  }

  return (
    <div className="App">
      <div className="container">

        <div className='welcome-container'>
          <div className="logo"></div>
          <div className="down-btn">
            <ImArrowDown className="downIcon blink" onClick={scrollToDetails} />
          </div>
        </div>

        <div className="details-container" ref={detailsRef}>

          <People />
        </div>
      </div>
    </div>
  );
}

export default App;
