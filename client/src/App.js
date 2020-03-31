import React, { useState, useEffect } from 'react';
import Lazyload from 'react-lazyload';
import { fetch } from 'isomorphic-unfetch';

  const App = () => {
    const [dataFromApi, setDataFromApi] = useState([]);
    useEffect(() => {
      async function fetchData() {
        try {
          const res = fetch('http://localhost:4000/image/');
          const data = await res.json();
          console.log(data)
          } catch (error) {
          console.log(
              `There has been a problem with your fetch operation: ${error.message}`
          );
          }
        setDataFromApi(res);
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
