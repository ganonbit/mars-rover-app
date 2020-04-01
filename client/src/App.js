import React, { useState, useEffect } from 'react';
import Lazyload from 'react-lazyload';
import './App.css';

const myApi = 'http://localhost:4000';


export const fetchApiData = async url => {
  try {
  const res = await fetch(url);
  const data = await res.json();
  return data;
  } catch (error) {
  console.log(
      `There has been a problem with your fetch operation: ${error.message}`
  );
  }
};



const App = () => {
  const [nasaDataFromApi, setNasaDataFromApi] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const result = await fetchApiData(myApi);
      console.log(result)
      setNasaDataFromApi(result);
    }
    
    fetchData();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Mars Rover Photo Gallery</h1>
        </div>
      </header>
      <section className="App-wrapper">
          {nasaDataFromApi.map((entry, key) => (
            <Lazyload throttle={200} offset={100} key={key}>
              <li>
                <img src={entry.image} />
              </li>
            </Lazyload>
          ))}
      </section>
    </div>
  );
}

export default App;
