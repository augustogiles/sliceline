import React from 'react';
import { createGlobalStyle } from 'styled-components'
import { Navbar } from './Navbar/Navbar'
import { Banner } from './Banner/Banner'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Open Sans', sans-serif;
    margin: 0px;
  }
`

function App() {
  return (
    <>
      <GlobalStyle/>
      <Navbar/>
      <Banner/>
      <div>
        Hello Sliceline
      </div>
    </>
  );
}

export default App;
