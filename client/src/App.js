import React, { useState, useEffect } from 'react';
import Lazyload from 'react-lazyload';
import { fetchApiData } from './';



  const App = () => {
    const [dataFromApi, setDataFromApi] = useState([]);
    useEffect(() => {
      async function fetchData() {
        const result = await fetchApiData(nasaApi);
        setDataFromApi(result);
      }
      
      fetchData();
    }, []);
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Mars Rover Photos</h1>
          <h3>choose dates below:</h3>
        </div>
        <button className="App-btn"></button>
      </header>
      <section className="App-wrapper">
          {dataFromApi.map((photo, key) => (
            <Lazyload throttle={200} offset={100} key={key}>
              <li>
                <img src={photo} alt="photo of mars" />
              </li>
            </Lazyload>
          ))}
      </section>
    </div>
  );
}

export default App;
