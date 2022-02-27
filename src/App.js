import React from 'react';
import CountryState from './Components/core/Context/countryState';
import Routing from './Components/routes/routing';


function App() {
  return (
    <div>
      <CountryState>
        <Routing />
      </CountryState>
    </div>
  );
}

export default App;
