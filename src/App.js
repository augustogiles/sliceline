import React from 'react';
import { createGlobalStyle } from 'styled-components'
import { Navbar } from './Navbar/Navbar'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Open Sans', sans-serif;
  }
`

function App() {
  return (
    <>
      <GlobalStyle/>
      <Navbar/>
      <div>
        Hello Sliceline
      </div>
    </>
  );
}

export default App;
